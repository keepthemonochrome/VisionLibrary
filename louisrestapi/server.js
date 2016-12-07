var express = require('express');
var app = express()
// var parser = require('body-parser');
var multer = require('multer');

// Set max file size to 10MB per photo, max 20 photos, store in uploads/
var fileupload = multer({
  dest: 'uploads/',
  fileSize: 1024 * 1000 * 10,
  files: 20
})

// Declare an api router that routes requests from *:/api
var api = express.Router();

// api.use(parser.json());

// POST /api/photos
// Router endpoint for uploading photos uses multipart form data uploads
api.post('/photos', fileupload.array('photos', 20), (req, res) => {
  res.status(201).send('Good');
});

api.get('/photos', (req, res) => {

});

app.use('/api', api);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port *:' + port);
