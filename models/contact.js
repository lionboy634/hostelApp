const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const contactSchema = Schema({
    name: {
        type:String,
        required: true
    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    message:{
        type: String
    }
})


module.exports = mongoose.model("Contact", contactSchema);