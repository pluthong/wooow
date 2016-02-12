
function validationProductForm() {
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var category = document.getElementById("category").value;
    var productimage = document.getElementById("productimage").value;
    var priceReg = /^-?(\d{1,3})(\.\d{1,2})?$/;

    $("#errorShow").hide()

    if (!name) {
        $("#errorShow").show();
        document.getElementById('name').style.borderColor = "red";
        document.getElementById('name').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter the product name</b>";
        return false;
    }

    document.getElementById('name').style.borderColor = "";

    if (!price) {
        $("#errorShow").show();
        document.getElementById('price').style.borderColor = "red";
        document.getElementById('price').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter the product price</b>";
        return false;
    }

    if (!price.match(priceReg)) {
        $("#errorShow").show();
        document.getElementById('price').style.borderColor = "red";
        document.getElementById('price').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter a valid product price</b>";
        return false;
    }

    document.getElementById('price').style.borderColor = "";

    if (!category) {
        $("#errorShow").show();
        document.getElementById('category').style.borderColor = "red";
        document.getElementById('category').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please enter the product category</b>";
        return false;
    }

    document.getElementById('category').style.borderColor = "";

    if (!productimage) {
        $("#errorShow").show();
        document.getElementById('productimage').style.borderColor = "red";
        document.getElementById('productimage').focus();
        document.getElementById('gen_error').innerHTML = "<b>Please choose a product photo</b>";
        return false;
    }

    document.getElementById('productimage').style.borderColor = "";
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