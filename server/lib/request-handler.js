var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');

module.exports = {
  savePhoto : function(uuid, fileName, keywordArray, photoUUIDsArray){
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
    console.log("inside delete photo and uuid is "+uuid);
    photo.findOne({'uuid': uuid}, function(err, model) {
      if(err){
         console.log("Error in deleting document from the database");
        return;
      }
      console.log("model is ");
      console.log(model);
      // uuid (user's)
      // iterate through all the keywords in model[keywods]
       model['keywords'].forEach(function(element) {
         console.log("element is ");
         console.log(element);
         keyword.update({$pull: { 'photoUUIDs' : { 'uuid': element}}});
       });
    });
  },
  getPhotos() {
    // Find all photos, then use exec() to return a promise
    return photo.find({}).exec();
  }
}
//db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
}
