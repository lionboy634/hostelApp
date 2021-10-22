const Contact = require("../models/contact")
const User    = require("../models/userregister")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'rexilinbrown1@gmail.com',
            pass: '1.2.3.4.5.asiedu',
         },
    secure: true,
    });


exports.getContact = (req, res)=>{
    let title = "Discover The most secure Hostel Room For Students"
    res.render("contact",{
        title: title
    })
}

//controller for contact page
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
       
    }).save()
    .then(result=>{
        console.log(result)
         res.redirect('/contact');
    }).
    catch(err=>{
        if(err){
            console.log(err)
        }
    })

}



exports.booknow = (req, res)=>{
    res.render('booknow')
}

exports.process_booknow = (req, res)=>{
    let email        = req.body.email
    let firstName    = req.body.fname
    let lastName     = req.body.lname
    console.log(req.body.fname + " " +  req.body.lname)
    console.log(req.body.email)
    res.redirect("/")
}


//controller for rendering login page
exports.getLogin = (req, res)=>{
    res.render("login")
}


//controller for login post request
exports.authenticate = (req, res)=>{
    
     email = req.body.email
     password = req.body.password

    /* if(email && password){
         req.session.user = email
         req.session.admin = email
          res.redirect('/booknow');
     }
     */

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
                 res.redirect('/booknow');
            }
            else{
                res.json({error: "invalid password  or email"})
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
    res.render("registration")

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
            res.json({error: "email already exists"})
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
       user.save()  .then(savedUser=>{
                transporter.sendMail(mailData) .then(sent=>{
                    if(sent){
                    if(savedUser){
                        res.json({
                            message: "user registered successfully",
                            details : savedUser
                        })
                        
                
                    }
                    else{
                        res.status(402).json({error: "registration failed"})
                    }
                }
                else{
                    res.json({error: "mail couldnt be sent"})
                }
                }).catch(err=>console.log(err))
                
                
            })
    
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>console.log(err))
    

   
   


    
}

exports.about = (req, res)=>{
    res.render("about")
}