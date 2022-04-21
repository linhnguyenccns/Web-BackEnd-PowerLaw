// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Icon: {
        type: String,
        query: true
    },
    Title1: {
        type: String,
        query: true
    },
    Title2: {
        type: String,
        query: true
    },
    Content: {
        type: String,
        query: true
    }
});
//
const blogModule = mongoose.model('blog', blogSchema);
module.exports = blogModule