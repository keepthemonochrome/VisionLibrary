var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');
var thumb = require('node-thumbnail').thumb;

var fs = require('fs');
module.exports = {
  savePhoto : function(uuid, fileName, keywordArray, photoUUIDsArray, metaDataString){
    console.log("inside save photo");
    new photo({
      uuid: uuid,
      fileName: fileName,
      keywords: keywordArray,
      metaData: metaDataString
    })
    .save(() => console.log('photo created in db'))
    .catch(err => {throw err;})
    .then(
      keywordArray.forEach(function(targetKeyword, index){
        keyword.count({ keyword: targetKeyword })
        .then(function(count) {
          if (count !== 0) {
            keyword.update({keyword: targetKeyword},
              {$addToSet:
                { photoUUIDs: photoUUIDsArray[index] }
              }).exec();
            console.log('keyword updated in db');
          } else {
            new keyword ({
              keyword: targetKeyword,
              photoUUIDs: photoUUIDsArray[index]
            })
            .save(() => console.log('keyword created in db'))
            .catch(err => {throw err;});
          }
        })
      })
      )
  },
  //6890e033-bf46-4887-8da6-fceb9c15e395
  deletePhoto : function(uuid, path) {
    console.log("inside delete photo");
    photo.findOneAndRemove({'uuid': uuid})
    .then(function(model, err) {
      if(err) {
        console.log("Couldn't delete the photos, "+err);
      } else {
          model['keywords'].forEach(function(element) {
          keyword.findOneAndUpdate({'keyword': element},{$pull: { 'photoUUIDs' : { 'uuid': uuid}}}, {new: true}).exec()
          .then(function (keywordDoc) {
            if (keywordDoc.photoUUIDs.length === 0) {
              keywordDoc.remove();
            }
            fs.unlink(path.photos+'/'+uuid, function (err) {
             if(err) {
              console.log(err);
             } else {
              console.log("Successfully deleted");
             }
            })
          });
       });
      }
    })


  },


  getPhotos() {
    // Find all photos, then use exec() to return a promise
    return photo.find({}).exec();
  },
  getKeywords() {
    return keyword.find({}).exec();
  },
  getSearchedPhotos(searchWord) {
    return keyword.findOne({'keyword': searchWord}, function(err, found){
      if(err) {
        console.log(err);
      } else {
        return found;
      }
    });
  },
  getMetaData(uuid) {
    return photo.findOne({'uuid': uuid}, function(err, found){
      if(err) {
        console.log(err);
      } else {
        return found;
      }
    });
  }
}
//db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
