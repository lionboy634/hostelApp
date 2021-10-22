const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const userSchema = Schema({
    fullname    : String,
    email       : String,
    password    : String,
    sid         : Number,
    contact     : Number
});


module.exports = mongoose.model("User", userSchema);