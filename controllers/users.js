const Contact = require("../models/contact")
const Room    = require("../models/rooms")
const Book    = require("../models/booking")
const User    = require("../models/userregister")




//GET Payment Page Controller
    exports.getPayments = (req, res)=>{
                Book.findOne({bookedby: req.session.user}).populate('bookedby room')
                .then(user=>{
                    if(user){
                        
                        console.log(user)
                        res.render("payment", {
                        user: user,
                        key: process.env.SECRET_KEY
                    })
                    }
                    else{
                        console.log("search failed")
                    }
                }).catch(err=>console.log(err))
                    
           
          
    }


   //GET Rooms Controllers 
    exports.getRooms = (req, res)=>{
        res.render("rooms",{
            isAuthenticated: req.session.admin
        })
    }


    //GET Contact Page Controllers
exports.getContact = (req, res)=>{
    let title = "Discover The most secure Hostel Room For Students"
    res.render("contact",{
        title: title,
        isAuthenticated: req.session.admin
    })
}

// POST controller for contact page
exports.addContact = (req, res)=>{
    let email = req.body.email
    let message = req.body.message
    let name = req.body.name
    let phone = req.body.phone
    let studentId = req.body.studentid

    let contact = new Contact({
        name : name,
        message : message,
        phone   : phone,
        email   : email
       
    }).save() .then(result=>{
        console.log(result)
         res.redirect('/contact');
    }).catch(err=>console.log(err))
}



exports.about = (req, res)=>{
    res.render("about",{
        isAuthenticated: req.session.admin,
        csrfToken: req.csrfToken()
    })
    
}