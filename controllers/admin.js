const Admin  = require("../models/admin")
const bcrypt = require("bcryptjs")


//sign up controller
const signup =   (req, res)=>{
    
    if(!email || !password || !username){
        res.status(402).json({error: "please provide values for teh fields"})
    }

     Admin.findOne({email}).then(user=>{
        if(user){
            res.json({error:"user already exists"})
        }

        bcrypt.hash(password, 12)
        .then(hashedpassword=>{

            const admin = new Admin({
                username: username,
                email: email,
                password: hashedpassword
            })

            admin.save()
            .then(saved=>{
                if(saved){
                    res.status(200).json({message: "user registered successfully"})
                }
                else{
                    res.status(402).json({error: "invalid email or password"})
                }
            })
            .catch(err=>{
                if(err){
                    console.log(err)
                }
            })
        })
    })
    .catch((err)=>{
        if(err){
            console.log(err)
        }
    })
   
}


//login controller
const login = (res, req)=>{
    const {email, password} =   req.body

    if(!email || password){
        res.json({error: "please provide your email or password"})
    }

    Admin.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(402).json({error: "invalid password or email"})
        }

        bcrypt.compare(password, savedUser.password)
        .then(matched=>{
            if(matched){
                res.json("logged in successfully")
            }
            else{
                res.json({error:"invalid password or email"})
            }
        })

        
    }).catch(err=>{
        console.log(err)
    })
}


const editprofile = (req, res)=>{
    
}


const manage = (req, res)=>{

}



//password changer controller
const changePassword = (req, res)=>{
    const {pass, npass, cpass } = req.body

    if(!pass || !npass || !cpass){
        res.status(402).json({error: "please fill the fields"})
    }

    
    Admin.findOneAndDelete({password})
    .then(changedpassword=>{
        if(changePassword){
            res.json({message: "password changed successfully"})
        }
    })
}




//profile updater controller
const updateProfile = (req, res)=>{
    const {email} = req.body

    if(!email){
        res.status(402).json({error:"please provide email"});
    }
    
    Admin.findOneAndReplace({email})
    .then(changed=>{
        if(changed){
            res.json({message: "email changed successfully"})
        }
        else{
            res.status(402).json({error: "profile update failed"})
        }
    })
}





module.exports = {
    login,
    editprofile,
    manage,
    signup,
    changePassword
}