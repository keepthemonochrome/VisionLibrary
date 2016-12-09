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
})

var fileupload = multer({
  storage: storage,
  fileSize: 1024 * 1000 * 10,
  files: 20
}).array('photos');

// Pass in the request and get the url that was requested
let getRequestURL = req => req.protocol + '://' + req.get('host') + req.originalUrl;

// Declare an api router that routes requests from *:/api
var api = express.Router();

api.use(cors());
api.use(parser.json());

// POST /api/photos
// Router endpoint for uploading photos uses multipart form data uploads
api.post('/photos', fileupload, (req, res) => {

  // Receive label from api
  detection.main(req.files[0].path, function(err, labels){
    if (err) {
      console.log(err);
    } else {
      // TODO: when multiple photos uploaded
      var uuid = req.files[0].filename;
      var fileName = req.files[0].originalname;
      var keywordArray = [];
      labels.forEach(function(obj){
        if (obj.desc) {
          console.log('type of obj.dsec', obj.desc, typeof obj.desc);
          keywordArray.push(obj.desc);
        }
      });
      console.log('keywordArray in server', keywordArray);
      handler.savePhoto(uuid, fileName, keywordArray);
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
  // TODO delete photo
  res.send('Photo deleted');
});

api.get('/photos/:uuid', (req, res) => {
  let filePath = path.photos + '/' + req.params.uuid;
  res.sendFile(filePath);
});

api.get('/keywords/:keyword', (req, res) => {
  // TODO search mongo keyword collection for the keyword and return all photo UUIDs
});


api.get('/keywords', (req, res) => {
  // TODO return all keywords
});

app.use('/api', api);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port *:' + port);
