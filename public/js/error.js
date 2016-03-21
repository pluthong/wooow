$(document).ready(function () {

    launched();

});


function lauched() {

    var hiddenMessageError = $("#err_mess").val();

    var hiddenMessageSuccess = $("#succ_mess").val();

    if (hiddenMessageError) {
        document.getElementById('gen_error').innerHTML = "<b>" + hiddenMessageError + "</b>";
        $("#errorShow").show();
    } else {
        $("#errorShow").hide();
    }

    if (hiddenMessageSuccess) {
        document.getElementById('gen_success').innerHTML = "<b>" + hiddenMessageSuccess + "</b>";
        $("#successShow").show();
    } else {
        $("#successShow").hide();
    }

}