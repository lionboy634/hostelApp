const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require("mongoose")
const errorController = require("./controllers/error");
const cors = require("cors")
require("dotenv").config()
const csrf = require("csurf")


//const csrf = require("csurf")
let app = express();
let adminRouter = require('./routes/admin');
let usersRouter = require('./routes/users');
const csrfProtection = csrf()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended : false})) ;
app.use(express.json())
app.use(cors({ origin: '*'}));
//app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'ABC-39-DKS-393',
  resave: false,
  saveUninitialized: false
}))
//app.use(csrfProtection)
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  if (req.session.user && req.session.admin) {
   res.locals.admin = true
}
next()
 })


app.use("/admin", adminRouter)      //admin page router
app.use("/", usersRouter)           //user page router
app.use(errorController.error);       //middleware handles error
// error handler

//mongoose database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:true
}).then(result =>{
  console.log("connnected successfully")
  //server listening
  app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at port ${process.env.PORT}`);})
})
.catch(err =>{
  console.log(err)
})


//server listener function


module.exports = app;
