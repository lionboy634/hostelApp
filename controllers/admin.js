    const Admin  = require("../models/admin")
    const Room   = require("../models/rooms")
    const bcrypt = require("bcryptjs")
    const jwt    = require("jsonwebtoken")


   

    const getProfile = (req, res)=>{
        Admin.findById(req.session.admin).then(user=>{
            if(user){
              
                res.render("admin/adminprofile",{
                    user: user
                })
            }
        }).catch(err=>console.log(err))
       
    }

    const createRooms = async (req, res)=>{

    try{
        const {room, type, price}   = req.body

        if(!room || !type || !price){
            return res.status(401).json({msg: "please fill the fields"})
        }

        const exist = await Room.findOne({ rnumber: room})
        if(exist){
            return res.status(500).json({msg: "room exists"})
        }
        const rooms = new Room({  rnumber: room,  rtype:   type,  price:   price })
        const added = await rooms.save()

        if(!added){
            res.status(400).json({msg: "rooms was not created"})
        }
        res.status(200).json({rooms: added})
    }
         catch(err){
            return res.status(500).json({msg: err})
        }
    }

    //sign up controller
    const signup =   (req, res)=>{
        const {email, password, username} = req.body
        if(!email || !password || !username){
        return  res.status(401).json({error: "please provide values for the fields"})
        }
        Admin.findOne({email}).then(user=>{
            if(user){
                return res.json({error:"user already exists"})
            }
        bcrypt.hash(password, 12)  .then(hashedpassword=>{
                const admin = new Admin({
                    username: username,
                    email: email,
                    password: hashedpassword
                })
                admin.save().then(saved=>{
                    if(saved){
                        res.status(200).json({message: "user registered successfully"})
                    }
                    else{
                        res.status(402).json({error: "invalid email or password"})
                    }
                }) .catch(err=>  console.log(err))
            })
        })   .catch((err)=> console.log(err) )
    }

    const authorize = (req, res, next)=>{
        if(req.session && req.session.admin){
          return next()
        }
        else{
           res.redirect('/admin');
        }
      }
    const authenticateJWT = async(req, res, next)=>{

        try{
            console.log(res.getHeader('authorization'))
            const authHeaders = req.headers.authorization
            console.log(authHeaders)
            
        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(401).json({msg: "no token found"});
       }
            const token = authHeaders.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if(decoded){
            console.log(decoded.user_id)
            const user = await Admin.findById(decoded.user_id)
            user.password = undefined
            req.user = user
            console.log(user) 
            next()
         } 
            
        } catch(err){
            return res.status(500).json(err);
        }
    }

    //login controller
    const login = (req, res)=>{

        const {email, password } = req.body

        if(!email || !password){
        return res.status(401).json({error: "please provide your email or password"})
        }

        Admin.findOne({email})
        .then(savedUser=>{
            if(!savedUser){
            return  res.status(402).json({error: "invalid password or email"})
            }

            bcrypt.compare(password, savedUser.password)  .then(matched=>{
                if(matched){

                    // const token = jwt.sign({user_id: savedUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
                     req.session.admin = savedUser._id
                     req.session.user  = savedUser.email
                     return res.redirect('/admin/profile')
                }
                else{
                    return res.status(401).json({error:"invalid password or email"})
                }
            })    }).catch(err=>{
            console.log(err)
        })
    }


    const editProfile = (req, res)=>{
        
    }


    const manage = (req, res)=>{

        
    }

    
    //password changer controller
    const changePassword = async (req, res)=>{

    try {
        const {opass, npass, cpass } = req.body

        if(!opass || !npass || !cpass){
            return res.status(200).json({error: "please fill all the fields"})
        }

        const admin = Admin.findOneAndUpdate({_id: req.session._id},  pass)

        if(!admin){
            return res.status(404).json({msg: "please check your password"})
        }
        res.status(200).json({admin})
        
    } catch (error) {
        res.status(500).json({error})
    }

    }



    //profile updater controller
    const updateProfile = (req, res)=>{
        const {email} = req.body

        if(!email){
        return res.status(401).json({error:"please provide email"});
        }
        Admin.findOneAndUpdate({email})
        .then(changed=>{
            if(changed){
                res.json({message: "email changed successfully"})
            }
            else{
                res.status(401).json({error: "profile update failed"})
            }
        })
    }





    module.exports = {
        login,
        editProfile,
        manage,
        signup,
        authenticateJWT,
        changePassword,
        authorize,
        getProfile,
        createRooms,
    }