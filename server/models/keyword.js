
var mongoose = require('mongoose');
var keywordSchema =mongoose.Schema({
   keyword: {type: String, required: true},
   photoUUIDs: [{
                uuid: { type: String },
                scores: { type: String}
                }]
                // array of objects. [{uuid: ...., scores: ...}, {..} ]
});

var Keyword = mongoose.model("KeyWord", keywordSchema);
module.exports = Keyword;