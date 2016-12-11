var express = require('express');
var app = express();
var parser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var uuid = require('node-uuid').v4;
var db = require('./config');
var fs = require('fs');
var im = require('imagemagick');
require('./config/cloudvision.config.js');
var detection = require('../susanapitest/server/vision/labelDetection');
var handler = require('./lib/request-handler');
var _ = require('lodash');
var {pick} = require('lodash/fp');

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
  req.files.forEach(file => {
    detection.main(file.path, function(err, labels){
      if (err) {
        console.log(err);
      } else {
        var uuid = file.filename;
        var fileName = file.originalname;
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
        var newPath = path.photos +'/' + uuid;
        im.resize({
          srcData: fs.readFileSync(newPath, 'binary'),
          height: 200
        }, function(err, stdout, stderr){
          if (err) throw err;
          fs.writeFileSync(newPath + '-thumb', stdout, 'binary');
        });
      }
    });
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
      photo['thumbUrl'] = requestURL + '/' + photo.uuid + '-thumb';
      return photo;
    });
    res.json(photosWithURLs);
  });
});

api.post('/photos/delete/:uuid', (req, res) => {
 //handler.savePhoto('nelson', "fileName",['dog','cat']);//just for testing
  handler.deletePhoto(req.params.uuid, path);

  res.end("Ended");
});
//85e93eee-870e-4727-b7c2-d623d22bc4fc

api.get('/photos/:uuid', (req, res) => {
  let filePath = path.photos + '/' + req.params.uuid;
  res.sendFile(filePath);
});

api.get('/keywords/:keyword', (req, res) => {
  handler
  .getSearchedPhotos(req.params.keyword)
  .then ((value)=> {
    console.log(value);
    res.send(value);
    res.end();
  });
});

api.get('/keywords', (req, res) => {
  handler
  .getKeywords()
  .then(keywords => {
    console.log(keywords);
    // let keywordList = [];
    let returnData = keywords.map(pick(['keyword', 'photoUUIDs']));
    res.json(returnData);
    res.end();
  });
});

app.use('/api', api);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port *:' + port);
