const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    image: {
        type: String,

    },
    created_date: {
        type: Date, default: Date.now()
    }

});

module.exports = UserModel = mongoose.model('Users', userSchema);