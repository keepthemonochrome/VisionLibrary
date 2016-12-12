
var mongoose = require('mongoose');
var keywordSchema =mongoose.Schema({
   keyword: {type: String, required: true},
   photoUUIDs: [{
                uuid: { type: String },
                scores: { type: String}
                }],
   searchedCount: {type: Number, default: 0}
                // array of objects. [{uuid: ...., scores: ...}, {..} ]
});

var Keyword = mongoose.model("KeyWord", keywordSchema);
module.exports = Keyword;

/*
{
  keyword: "dog",
  photouuids: [{uuid: nimmy, scores: 77}]

},
{
  keyword: "cat",
  photouuids: [{uuid: nimmy, scores: 77}, {uuid: susan, scores: 79}]

}

*/