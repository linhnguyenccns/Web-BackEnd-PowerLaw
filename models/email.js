// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    Content: {
        type: String,
        query: true
    }
});
//
const emailModule = mongoose.model('email', emailSchema);
module.exports = emailModule