function validationForm() {

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    document.getElementById('phone').style.borderColor = "";
    document.getElementById('err_phone').innerText = "";
    document.getElementById('err_email').innerText = "";

    if (!email.match(emailReg)) {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('err_email').style.color = "red";
        document.getElementById('err_email').innerText = "email not in correct format";
        return false;
    }

    document.getElementById('email').style.borderColor = "";
    phone = phone.replace(/[^0-9]/g, '');

    if (phone.length != 10) {
        document.getElementById('phone').style.borderColor = "red";
        document.getElementById('err_phone').style.color = "red";
        document.getElementById('err_phone').innerText = "phone number must be 10 digits";
        return false;
    }

    return true;
}

function fileSelected() {
    var file = document.getElementById('fileToUpload').files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

        document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
}

$(document).ready(function () {
    var today = new Date();
    document.getElementById("currYear").textContent = today.getFullYear();
});