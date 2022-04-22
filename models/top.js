// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topSchema = new Schema({
    Icon: {
        type: String,
        query: true
    },
    Content: {
        type: String,
        query: true
    }
});
//
const topModule = mongoose.model('top', topSchema);
module.exports = topModule