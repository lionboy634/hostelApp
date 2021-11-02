const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    rnumber:{
        type: String,
        required: true
    },
    rtype:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
})




module.exports = mongoose.model("Room", roomSchema)