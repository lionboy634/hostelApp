const mongoose = require("mongoose")

const {Schema} = mongoose

const bookingSchema = new Schema({
    
    
    room:{
        type : Schema.Types.ObjectId,
        ref: "Room"
    },
     bookedby:{
        type : Schema.Types.ObjectId,
        ref: "User"
   },
   course: String,
    guardian:[ {
        name: {
            type:String,
        },
        contact: {
            type: String,

        } ,
        relationship: {
            type: String,
        }
            } ],
    address:{
        type:String,
    },

    time:{
        type: Date,
        default: Date.now()
    }
    
})



module.exports = mongoose.model("Books", bookingSchema)