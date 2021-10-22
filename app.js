const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require("mongoose")
let errorController = require("./controllers/error");
let {config} = require("./models/config")
const {MONGODB_URI}   = require("./keys")
const PORT = process.env.PORT || 3000
require("./models/userregister")
//const csrf = require("csurf")
let adminRouter = require('./routes/admin');
let usersRouter = require('./routes/users');
let app = express();
//let csrfProtection = csrf()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : false})) ;
app.use(express.json())
//app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'ABC-39-DKS-393',
  resave: true,
  saveUninitialized: true
}))
//app.use(csrfProtection)
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  if (req.session.user && req.session.admin) {
   res.locals.admin = true
   /**  User.findById(req.session.user._id).then(user=>{
      req.user = user
    })
    .catch(err=>console.log(err))
  }
  */
}
  next()
 })

app.use("/admin", adminRouter)      //admin page router
app.use("/", usersRouter)           //user page router
app.use(errorController.error);       //middleware handles error
// error handler

//mongoose database connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser:true
}).then(result =>{
  console.log("connnected successfully")
  //server listening
  app.listen(PORT, ()=>{
    console.log(`server is listening at port ${PORT}`);})
})
.catch(err =>{
  console.log(err)
})


mongoose.connection.on("connected", (err, client)=>{
  if(err){
    console.log(err)
  }
  console.log("Connected successfully")
})

//server listener function


module.exports = app;
