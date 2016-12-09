var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');

module.exports = {
  savePhoto : function(uuid, fileName, keywordArray){
    // store uuid(filename), fileName(originalname), keyword(result[i].desc) photo table
    console.log(keywordArray,'in request-handler');
    new photo({
      uuid: uuid,
      fileName: fileName,
      keywordArray: keywordArray
    })
    .save(function(err){
      if(err) {
        console.log(err);
      } else {
        console.log('photo saved into db');
      }
    }).then(
       new keyword ({
        keyword: 'new',
        photoUUIDs: [ {'uuid':1, 'scores':10.00 } ]
      })
      .save(function(err){
        if(err) {
          console.log(err);
        } else {
          console.log('key saved');
        }
      })
    );

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