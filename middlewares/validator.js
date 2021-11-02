const {check, body} = require("express-validator")


const validate = ()=>{
   [ 
    check('email').isEmail().
    withMessage("enter a valid email")
    .custom((value, {req})=>{
        if(value === 'rexilinbrown1@gmail.com'){
            throw new Error("Email has been blacklisted")
        }
        return true;
    }),

    body('password').isLength({min: 7}).withMessage("invalid password or email")

]

}



module.exports = validate