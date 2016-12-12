var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
   uuid: {type: String, required: true},
   fileName: { type: String, required: true},
   keywords: { type: Array },
   metaData: { type: String, default: '{}' }
});
var Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;