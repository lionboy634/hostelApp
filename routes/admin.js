const express = require("express")
const router = express.Router()

const {manage, login, editprofile}  = require("../controllers/admin")


router.get("/logout", (req, res)=>{
    res.redirect("/admin/")
})

router.get("/dashboard", (req, res)=>{
    res.render("admin/dashboard")
})


//admin profile page
router.get("/profile", (req, res)=>{
    res.render("admin/adminprofile")
})


// user management page
router.get("/manage-rooms", (req, res)=>{
    res.render("admin/managerooms")
})

router.get("/create-rooms", (req, res)=>{
    res.render("admin/create-rooms")
})


router.get("/manage-students", (req, res)=>{
    res.render("admin/manage-students")
})

//index page
router.get("/", (req, res)=>{
    res.render('admin/index')
})





module.exports = router