// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
const questionModule = mongoose.model('question', questionSchema);
module.exports = questionModule