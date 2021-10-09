const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require("mongoose")
let errorController = require("./controllers/error");


var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : false}))
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'ABC-39-DKS-393',
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.session && req.session.admin) {
  res.locals.admin = true
  }
  next()
 })
 

app.use("/admin", adminRouter)      //admin page router
app.use("/", usersRouter)           //user page router


app.use(errorController.error);       //middleware handles error

// error handler


//server listener function
app.listen(3000, ()=>{
  console.log("server is listening")
})


//module.exports = app;
