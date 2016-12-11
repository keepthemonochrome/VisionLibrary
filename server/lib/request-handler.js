var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');

module.exports = {
  savePhoto : function(uuid, fileName, keywordArray, photoUUIDsArray){
    console.log("inside save photo");
    new photo({
      uuid: uuid,
      fileName: fileName,
      keywords: keywordArray
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
  deletePhoto : function(uuid) {
    photo.findOneAndRemove({'uuid': uuid})
    .then(function(model, err) {
      if(err) {
        console.log("Couldn't delete the photos, "+err);
      } else {
          model['keywords'].forEach(function(element) {
          keyword.update({'keyword': element},{$pull: { 'photoUUIDs' : { 'uuid': uuid}}})
          .then(function(model, error){
          if(error){
            console.log("Error in updating keywords table, "+ error);
            console.log(error);
          }
         });
       });
      }
    });

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
  }
}
//db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
