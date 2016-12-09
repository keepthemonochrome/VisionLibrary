var db = require('../config');
var keyword = require('../models/keyword');
var photo = require('../models/photo');

module.exports = {
  savePhoto : function(uuid, fileName, keywordArray){
    // store uuid(filename), fileName(originalname), keyword(result[i].desc) photo table
    console.log('type:',typeof keywordArray);
    console.log(keywordArray);
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
  }
}
//db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )



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