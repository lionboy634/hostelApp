var express = require('express');
var router = express.Router();
const userController = require("../controllers/users")

const auth = (req, res, next)=>{
  if(req.session && req.session.admin){
    return next()
  }
  else{
     res.redirect('/login');
  }
}


/* GET users listing. */

//index page
router.get('/', function(req, res, next) {
  res.render('index')
});

// GET contact page
router.get('/contact', userController.getContact);

//POST contact page
router.post('/contact', userController.addContact)

// GET booknow page
router.get('/booknow', auth ,  userController.booknow);

//POST booknow page
router.post('/booknow', auth ,  userController.process_booknow);

//GET login page
router.get("/login", userController.getLogin)

//POST login page
router.post("/login", userController.authenticate)

//GET about page
router.get("/about", userController.about)

//GET registration page
router.get("/registration", userController.register)


//GET logout page
router.get("/logout", (req, res)=>{
     req.session.destroy()
     res.redirect('/');
  })


//export module
module.exports = router;
