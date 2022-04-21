// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
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
const aboutModule = mongoose.model('about', aboutSchema);
module.exports = aboutModule