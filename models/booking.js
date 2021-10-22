const mongoose = require("mongoose")

const {Schema} = mongoose

const bookingSchema = new Schema({
    email: {
        type:String,
        ref: "User"
    },
    name:{
        type:String,
        ref: "User"
    },
    price:{
        type:Float64Array,
        required: true
    },

    time:{
        type: Date,
        default: Date.now()
    }
    
})



module.exports = mongoose.model("HotelBooks", bookingSchema)