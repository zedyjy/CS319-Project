$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
function redirectToHomePage() {
    window.location.href = "Home.html";
}