var express = require('express');
var router = express.Router();
const axios = require("axios")
const userController = require("../controllers/users")
const authController = require("../controllers/auth")
const fs = require("fs")

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
  res.render('index',{
    isAuthenticated: req.session.admin
  })
});

// GET contact page
router.get('/contact', userController.getContact);

//POST contact page
router.post('/contact', userController.addContact)

// GET booknow page
router.get('/booknow/:id', auth ,  authController.getBooknow);

//POST booknow page
router.post('/booknow',auth, authController.postBooknow);

//GET login page
router.get("/login", authController.getLogin)

//POST login page
router.post("/login", authController.postLogin)

//GET about page
router.get("/about", userController.about)

//GET registration page
router.get("/registration", authController.register)
router.post("/registration", authController.process_register)


//GET logout page
router.get("/logout", (req, res)=>{
     req.session.destroy()
     res.redirect('/');
  })


//GET locations page
router.get("/location", (req, res)=>{
  res.render("locations")
})


//GET blog page
router.get("/blog", (req, res)=>{
  res.render("blog",{
    isAuthenticated: req.session.admin
  })
})

//GET mainblog page
router.get("/blogs", async (req, res)=>{
  res.render("mainblog",{
    isAuthenticated: req.session.admin,
    title: "THE KNUST BLOG",
    para1: 'she is the one',
    heading: 'THE INAUGURATION OF KNUST FIRST FEMALE VICE CHANCELLOR',
    news: fs.readFileSync("./blog/data.txt", 'utf8')

  })
})

router.get("/rooms", auth, userController.getRooms)


router.get("/payments", auth, userController.getPayments)

router.get("/test",(req, res)=>{
  res.render("test")
})

router.get('/explore-rooms', (req, res)=>{
  res.render("explore-rooms")
})

router.get('/verify', auth, (req, res)=>{
  console.log(req.query.transaction_id)
  const id = req.query.transaction_id
  const status = req.query.status
  //console.log(req.params.id)

  axios(`https://api.flutterwave.com/v3/transactions/${id}/verify`,{
    method: "GET",
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer FLWSECK_TEST-ffa0fd22ae56e1d5479b79ff2f2e0925-X'
    }
  }).then(response=>{
    if(status == 'successful' &&  id){
      if(response){
        console.log(response.data.customer)
        res.render('verified',{
          info: response.data,
          isAuthenticated: req.session.admin
        })
      }
    }
    else{
      return res.json({msg: "transaction failed"})
    }
  })
  
})


//export module
module.exports = router;
