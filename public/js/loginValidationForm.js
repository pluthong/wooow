function validationSignUpForm() {
    var firstname = document.getElementById("first_name").value;
    var lastname = document.getElementById("last_name").value;
    var joinemail = document.getElementById("join_email").value;
    var joinpassword = document.getElementById("join_password").value;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    $("#errorShow").hide();
 
    if (!firstname) {
        $("#errorShow").show();
        document.getElementById('first_name').style.borderColor = "red";
        document.getElementById('first_name').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your first name</b>";
        return false;
    }

    document.getElementById('first_name').style.borderColor = "";

    if (!lastname) {
        $("#errorShow").show();
        document.getElementById('last_name').style.borderColor = "red";
        document.getElementById('last_name').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your last name</b>";
        return false;
    }

    document.getElementById('last_name').style.borderColor = "";

    if (!joinemail) {
        $("#errorShow").show();
        document.getElementById('join_email').style.borderColor = "red";
        document.getElementById('join_email').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your email</b>";
        return false;
    }

    if (!joinemail.match(emailReg)) {
        $("#errorShow").show();
        document.getElementById('join_email').style.borderColor = "red";
        document.getElementById('join_email').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter a valid email address</b>";
        return false;
    }

    document.getElementById('join_email').style.borderColor = "";

    if (!joinpassword) {
        $("#errorShow").show();
        document.getElementById('join_password').style.borderColor = "red";
        document.getElementById('join_password').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your password</b>";
        return false;
    }

    if (joinpassword.length < 6) {
        $("#errorShow").show();
        document.getElementById('join_password').style.borderColor = "red";
        document.getElementById('join_password').focus();
        document.getElementById('gen_error').innerHTML = "<b>Password must be 6 characters or more</b>";
        return false;
    }

    document.getElementById('join_password').style.borderColor = "";
}

function validationSignInForm() {
    var joinemail = document.getElementById("join_email").value;
    var joinpassword = document.getElementById("join_password").value;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    $("#errorShow").hide()

    if (!joinemail) {
        $("#errorShow").show();
        document.getElementById('join_email').style.borderColor = "red";
        document.getElementById('join_email').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your email</b>";
        return false;
    }

    if (!joinemail.match(emailReg)) {
        $("#errorShow").show();
        document.getElementById('join_email').style.borderColor = "red";
        document.getElementById('join_email').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter a valid email address</b>";
        return false;
    }

    document.getElementById('join_email').style.borderColor = "";

    if (!joinpassword) {
        $("#errorShow").show();
        document.getElementById('join_password').style.borderColor = "red";
        document.getElementById('join_password').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter your password</b>";
        return false;
    }

    if (joinpassword.length < 6) {
        $("#errorShow").show();
        document.getElementById('join_password').style.borderColor = "red";
        document.getElementById('join_password').focus();
        document.getElementById('gen_error').innerHTML = "<b>Password must be 6 characters or more</b>";
        return false;
    }

    document.getElementById('join_password').style.borderColor = "";
}

var $alertMsgError = $("#errorShow");

$alertMsgError.on("close.bs.alert", function () {
    $alertMsgError.hide();
    return false;
});


var $alertMsgSuccess = $("#successShow");

$alertMsgSuccess.on("close.bs.alert", function () {
    $alertMsgSuccess.hide();
    return false;
});
