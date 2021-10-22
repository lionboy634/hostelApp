const mongoose = require("mongoose")



const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: {
        type:String,
    }


})



module.exports = mongoose.model("Comments", commentSchema)