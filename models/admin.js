const mongoose = require("mongoose");
const Schema = mongoose.Schema

const adminSchema = Schema({
    username:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Admin", adminSchema)