var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');

module.exports = {
  savePhoto(uuid, fileName, keywordArray){
    // store uuid(filename), fileName(originalname), keyword(result[i].desc) photo table
    console.log('type:',typeof keywordArray);
    new photo({
      uuid: uuid,
      fileName: fileName,
      keywords: keywordArray
    })
    .save(function(err){
      if(err) {
        console.log(err);
      } else {
        console.log('photo saved into db');
      }
    })
    .then(
      keywordArray.forEach(function(targetKeyword){
        keyword.count({ keyword: targetKeyword }, function(err, count) {
          if (count!==0) {
            console.log('count is not 0');
          } else {
            console.log('count is 0');
          }
        }) //end of count
      }) // end of forEach
    ) // end of then
  },
  getPhotos() {
    // Find all photos, then use exec() to return a promise
    return photo.find({}).exec();
  }
}



      // keyword.update({keyword: 'cat'}, {$push: {'uuid': 2, 'scores': 5}}, done);


      // keywordArray.forEach(function(targetKeyword){
      //   keyword.count({ keyword: 'cat' }, function(err, count) {
      //       console.log('here?');
      //       if(count !== 0 ) { // update
      //         console.log('UPDATE');
      //         keyword.update({keyword: 'cat'}, {$push: {'uuid': 2, 'scores': 5}}, done);
      //       } else { // insert
      //         console.log('INSERT');
      //         var obje =
      //         new keyword ({
      //           keyword: 'cat',
      //           photoUUIDs: [ {'uuid':1, 'scores':10.00 } ]
      //         }).save(function(err){
      //           if(err) {
      //             console.log(err);
      //           } else {
      //             console.log('key saved');
      //           }
      //         });
      //       }
      //   })
      // })
    // );

//   }

// };
