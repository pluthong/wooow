
$(document).ready(function () {

    // initializing bootstrap's tooltip 
    $('body').tooltip({ selector: '[data-toggle=tooltip]' });

    var today = new Date();

    document.getElementById("currYear").textContent = today.getFullYear();

    var current_page_URL = location.href;

    $(".menu a").each(function () {

        if ($(this).attr("href") !== "#") {

            var target_URL = $(this).prop("href");

            if (target_URL == current_page_URL) {
              
                $('nav a').parents('li, ul').removeClass('active');
                $(this).parent('li').addClass('active');
                return false;
            }
        }
    });
});