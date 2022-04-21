// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postServiceSchema = new Schema({
    Icon: {
        type: String,
        query: true
    },
    Title: {
        type: String,
        query: true
    },
    Content: {
        type: String,
        query: true
    }
});
//
const postServiceModule = mongoose.model('postService', postServiceSchema);
module.exports = postServiceModule