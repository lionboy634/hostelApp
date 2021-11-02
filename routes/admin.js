const express = require("express")
const router = express.Router()
const Room  = require("../models/rooms")
const Books = require("../models/booking")
const User  = require("../models/userregister")

const {manage, login, changePassword, editProfile, signup, createRooms ,getProfile,  authorize}  = require("../controllers/admin")


router.get("/logout", (req, res)=>{
    req.session.destroy()
    res.redirect("/admin/")
})


router.get("/dashboard", async (req, res)=>{
    const rooms = await Room.find()
    console.log(rooms.length)

    const books = await Books.find()
    console.log(books.length)

    const users = await User.find()
    console.log(users.length)

    res.render("admin/dashboard",{
        rooms: rooms,
        books: books,
        users: users
    })
})


//admin profile page
router.get("/profile", authorize, getProfile )


// user management page
router.get("/manage-rooms", (req, res)=>{
    
    if(req.query.del){
        Room.findByIdAndDelete(req.query.del).then(successful=>{
            if(successful){
                console.log("deleted")
            }
        }).catch(err=>console.log(err))
    }
    Room.find().then(rooms=>{
        if(rooms){
            res.render("admin/managerooms",{
                rooms: rooms
            })
        }
    })
    
})

router.get("/create-rooms", (req, res)=>{
    res.render("admin/create-rooms")
})

router.post("/create-rooms", createRooms)

router.get("/manage-students", async (req, res)=>{

    const books = await Books.find().populate({ path: "bookedby", model: "User" })
    console.log(books.bookedby)
    
    res.render("admin/manage-students",{
        books: books
    })
})

//index page
router.get("/", (req, res)=>{
    res.render('admin/index')
})

router.post("/",  login)
router.post("/signup", signup)
router.post("/changepassword", changePassword )




module.exports = router