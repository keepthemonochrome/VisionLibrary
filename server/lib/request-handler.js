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
  }
}