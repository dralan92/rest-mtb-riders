const mongoose = require('mongoose');

const riderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
        password:String,
        zip: String,
        address: String,

        gender: String,
        email: String,
        dateOfBirth: String,
        phone: String
});

module.exports = mongoose.model('Riders', riderSchema);
