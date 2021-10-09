exports.getContact = (req, res)=>{
    let title = "Discover The most secure Hostel Room For Students"
    res.render("contact",{
        title: title
    })
}


exports.addContact = (req, res)=>{
    let email = req.body.email
    let message = req.body.message
    let name = req.body.name
    let phone = req.body.phone

    info = {
        email   : email,
        message : message,
        name    : name,
        phone   : phone
    }
    if(info){
        console.log(info);
         res.redirect('/');

    }
}



exports.booknow = (req, res)=>{
    res.render('booknow')
}

exports.process_booknow = (req, res)=>{
    console.log(req.body.fname + req.body.lname)
    res.redirect("/")
}


exports.getLogin = (req, res)=>{
    res.render("login")
}

exports.authenticate = (req, res)=>{
     email = req.body.email
     password = req.body.password

     if(email && password){
         req.session.user = email
         req.session.admin = email
          res.redirect('/booknow');
     }
}

exports.register = (req, res)=>{
    res.render("registration")

}

exports.about = (req, res)=>{
    res.render("about")
}