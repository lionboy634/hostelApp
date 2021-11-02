const Contact = require("../models/contact")
const User    = require("../models/userregister")
const Book    = require("../models/booking")
const bcrypt = require("bcryptjs")
const Room    = require("../models/rooms")
const nodemailer = require("nodemailer")
const validator = require("../middlewares/validator")


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'rexilinbrown1@gmail.com',
            pass: '1.2.3.4.5.asiedu',
         },
    secure: true,
    });

    

exports.getBooknow = async (req, res)=>{
    const id = req.params['id']
    
    const book = await Book.find({'room.rnumber': id })
    if(book){
        console.log(book)
    }
    else{
        console.log(failed)
    }
    Room.findOne({rnumber: id }).then(room=>{
        console.log(parseInt(room.rtype, 10))
        if(room){       
         //console.log(room)
         const number = parseInt(room.rtype)
         console.log(room)
           res.render("booknow",{
               room: room,
               title: 'Reservation Form',
               header: 'Discover our comfortable and affordable rooms',
               number: number
           })
        }
        else{
            console.log("not found")
        }
    }).catch(err=>console.log(err))
   
}

exports.postBooknow = async (req, res)=>{
    try{
    const {gname, grelation, gcontact,course, _id,  address , rtype, rnumber, price} = req.body
   // req.user = req.session.admin
   //console.log(req.session)
    const books = new Book({
        room : _id,
        address: address,
        course: course,
        bookedby : req.session.user,
        guardian: [{
                name: gname,
                contact: gcontact,
                relationship: grelation

            }]
    })

    const booked = await books.save()

    if(!booked){
        return res.status(401).json({msg: 'couldnt save it'})
    }
    //res.status(200).json({details: booked})
    res.redirect("/payments")
}
catch(err){
    return res.status(500).json({msg: 'oops try again'})
}
}


//controller for rendering login page
exports.getLogin = (req, res)=>{
    
    res.render("login")
}


//controller for login post request
exports.postLogin = (req, res)=>{
    
     email = req.body.email
     password = req.body.password

     if(!email || !password){
         res.json({error: "please enter your password"})
     }

     User.findOne({email : email}).
     then(saveduser=>{
        bcrypt.compare(password, saveduser.password)
        .then(matched=>{
            if(matched){
                req.session.user =    saveduser._id
                req.session.admin   = saveduser.email
                req.session.loggedIn = true
                return req.session.save(err=>{
                    console.log(err)
                    res.redirect('/rooms');
                })
                
            }
            else{
               return res.json({error: "invalid password  or email"})
            }
        })

        .catch(err=>{{
            console.log(err)
        }})
    
     })
     .catch(err=>{
         console.log(err)
     })
    }
    


// controller for registration page
exports.register = (req, res)=>{
    res.render("registration",{
        isAuthenticated: req.session.admin
    })

}

exports.process_register = (req, res)=>{
    const mailData =
     {
        from: 'rexilinbrown1@gmail.com',  // sender address
        to: 'kofiamaasem@gmail.com',   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b>'
};
    let email       = req.body.email
    let phonenumber = req.body.number
    let fullname    = req.body.fullname
    let sid         = req.body.number
    let password    = req.body.password

   User.findOne({email: email}) .then(found=>{
       //check if email exists
        if(found){
           return res.status(401).json({error: "email already exists"})
        }
        //hash passwords
        bcrypt.hash(password, 12)  .then(hashedpassword=>{
            const user = new User({
                email       : email,
                phonenumber : phonenumber,
                fullname    : fullname,
                password    : hashedpassword,
                studentId   : sid
            })
            //save new users
       user.save().then(savedUser=>{
                transporter.sendMail(mailData) .then(sent=>{
                    if(sent){
                    if(savedUser){
                       return res.json({   message: "user registered successfully",   details : savedUser   })
                 }
                    else{
                      return  res.status(403).json({error: "registration failed"})
                    }
                }
                else{
                    res.json({error: "mail couldnt be sent"})
                }
                }).catch(err=>console.log(err))
                
                
            })   .catch(err=>{
                console.log(err)
            })
        })  .catch(err=>{
            console.log(err)
        })
    }).catch(err=>console.log(err))
    
}
