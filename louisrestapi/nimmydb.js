var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photoDatabase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected");
});

// var originalImageName = "";
// fs.readFile('/Users/nimmyissac/Desktop/Tests/puppy.jpg',function(err, data) {
//   originalImageName = '/Users/nimmyissac/Desktop/Tests/puppy.jpg';
//   var t = uuid.v4().toString();
//   console.log(t);
//   var bytes = (uuid.parse(t));
//   console.log(bytes);
//   console.log((uuid.unparse(bytes)));
//   //console.log(data);
// });

var Schema = mongoose.Schema;

var photoSchema = new Schema({
   uuid: {type: String, required: true},
   fileName: { type: String, required: true},
   keywords: {type: Array}
});

var keyWordSchema = new Schema({
   keyword: {type: String, required: true},
   photoUUIDs: {type: Array}, // array of objects. [uuid: ...., scores: ...]
});

// var data = [
//   {
//     "desc": "Taitung, Famous Places \"up the water flow\" marker",
//     "mid": "/g/1w0qynyx",
//     "score": 79.762381,
//     "bounds": [
//       {
//         "x": 261,
//         "y": 467
//       },
//       {
//         "x": 340,
//         "y": 467
//       },
//       {
//         "x": 340,
//         "y": 684
//       },
//       {
//         "x": 261,
//         "y": 684
//       }
//     ],
//     "locations": [
//       {
//         "latitude": 22.868394,
//         "longitude": 121.218272
//       }
//     ]
//   }
// ];

 // console.log("hello " +data[0].desc+" "+ data[0].score);


var Photo = mongoose.model("Photo", photoSchema);
var Keyword = mongoose.model("KeyWord", keywordSchema);

// var newPhoto = new Photo({
//   uuid: t,
//   fileName: puppy.jpg,
//   keywords: [data[0].desc, data[0].score]

// });

// var keyword = new Keyword({// see if keyword exists, if yes push to photouuids else make a new entry.
  
// });


// keyWord.count({keyword: data[0].desc}, function(err, c) {
//         if(c > 0){
//           //update the table b pushing to keywords of the particular model
//         } else {
//           // add new row to the table.
//         }
//       });



//newPhoto.save

// keyWord




