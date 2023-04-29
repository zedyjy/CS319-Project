$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function redirectToLoginPage() {
    window.location.href = "GeneralLogin.html";
}