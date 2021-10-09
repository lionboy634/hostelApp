const express = require("express")
const router = express.Router()


router.get("/logout", (req, res)=>{
    res.redirect("/admin/")
})


//index page
router.get("/", (req, res)=>{
    res.render('admin/index')
})


//dashboard page
router.get("/dashboard", (req, res)=>{
    res.render("admin/dashboard")
})


//admin profile page
router.get("/profile", (req, res)=>{
    res.render("admin/adminprofile")
})


// user management page
router.get("/manage", (req, res)=>{
    res.send("management page")
})




module.exports = router