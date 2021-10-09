function validateform() {
    var password = $("#password").val();
    var cpassword = $("#confirmpassword").val();


    if (password != cpassword) {
        $("error").addClass('error');
    }


}