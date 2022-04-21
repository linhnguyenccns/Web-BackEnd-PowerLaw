// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nofSchema = new Schema({
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
const nofModule = mongoose.model('nof', nofSchema);
module.exports = nofModule