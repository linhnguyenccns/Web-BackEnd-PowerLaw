// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inforSchema = new Schema({
    Logo: {
        type: String,
        query: true
    },

    IconPhone: {
        type: String,
        query: true
    },
    PhoneNumber: {
        type: String,
        query: true
    },

    IconInfor: {
        type: String,
        query: true
    },
    Infor: {
        type: String,
        query: true
    },

    IconEmail: {
        type: String,
        query: true
    },
    Email: {
        type: String,
        query: true
    },

    IconAddress: {
        type: String,
        query: true
    },
    Address: {
        type: String,
        query: true
    },

    IconTime: {
        type: String,
        query: true
    },
    Time: {
        type: String,
        query: true
    },
    Facebook: {
        type: String,
        query: true
    }
});
//
const inforModule = mongoose.model('infor', inforSchema);
module.exports = inforModule