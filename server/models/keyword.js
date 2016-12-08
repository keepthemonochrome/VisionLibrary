
var mongoose = require('mongoose');
var keyWordSchema =mongoose.Schema({
   keyword: {type: String, required: true},
   photoUUIDs: {type: Array}, // array of objects. [uuid: ...., scores: ...]
});

var Keyword = mongoose.model("KeyWord", keywordSchema);
module.exports = Keyword;