var express = require('express');
var app = express();
var parser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var uuid = require('node-uuid').v4;
var db = require('./config');
var fs = require('fs');
require('./config/cloudvision.config.js');
var detection = require('../susanapitest/server/vision/labelDetection');
var handler = require('./lib/request-handler');
var _ = require('lodash');

// Specify photo storage path
var path = {
  photos: __dirname + '/photo_storage'
};
// Create storage path if it doesn't exist
if (!fs.existsSync(path.photos)) {
  fs.mkdirSync(path.photos);
}

// console.log(__dirname)
// Set max file size to 10MB per photo, max 20 photos, store in uploads/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.photos)
  },
  filename: function (req, file, cb) {
    cb(null, uuid())
  }
});


var fileupload = multer({
  storage: storage,
  fileSize: 1024 * 1000 * 10,
  files: 20
}).array('photos');

// Pass in the request and get the url that was requested
let getRequestURL = req => req.protocol + '://' + req.get('host') + req.originalUrl;

// Serve static files
app.use('/', express.static('client/public'))

// Declare an api router that routes requests from *:/api
var api = express.Router();

api.use(cors());
api.use(parser.json());


// POST /api/photos
// Router endpoint for uploading photos uses multipart form data uploads
api.post('/photos', fileupload, (req, res) => {

  // Receive label from api
  console.log("inside the post");
  detection.main(req.files[0].path, function(err, labels){
    if (err) {
      console.log(err);
    } else {
      // TODO: when multiple photos uploaded
      var uuid = req.files[0].filename;
      var fileName = req.files[0].originalname;
      var keywordArray = [];
      var photoUUIDsArray = [];
      labels.forEach(function(obj){
        if (obj.desc) {
          keywordArray.push(obj.desc);
          var singlePhotoUUIDs = {'uuid': uuid, 'scores': obj.score};
          photoUUIDsArray.push(singlePhotoUUIDs);
        }
      });
      handler.savePhoto(uuid, fileName, keywordArray, photoUUIDsArray);
    }
  });

  console.log('Receiving files ', req.files);
  res.status(201);
});

api.get('/photos', (req, res) => {
 let requestURL = getRequestURL(req);
 handler
  .getPhotos()
  .then(photos => {
    // Turn every mongoose photo doc into a regular object, add a url key, and send it
    let photosWithURLs = _.map(photos, photo => {
      photo = photo.toObject();
      photo['url'] = requestURL + '/' + photo.uuid;
      return photo;
    });
    res.json(photosWithURLs);
  });
});

api.post('/photos/delete/:uuid', (req, res) => {
 //handler.savePhoto('nelson', "fileName",['dog','cat']);//just for testing
 console.log("request params id ", req.params.uuid);
  handler.deletePhoto(req.params.uuid, path);
  
 res.end("Ended");
 
});
//85e93eee-870e-4727-b7c2-d623d22bc4fc

api.get('/photos/:uuid', (req, res) => {
  let filePath = path.photos + '/' + req.params.uuid;
  res.sendFile(filePath);
});

api.get('/keywords/:keyword', (req, res) => {
  // TODO search mongo keyword collection for the keyword and return all photo UUIDs
});


api.get('/keywords', (req, res) => {
  // TODO return all keywords
  handler
  .getKeywords()
  .then(keywords => {
    console.log(keywords);
    let keywordList = [];
    keywords.forEach((keyword)=> {
      keywordList.push(keyword.keyword);
    });
    res.json(keywordList);
    res.end();
  });
});

app.use('/api', api);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port *:' + port);
