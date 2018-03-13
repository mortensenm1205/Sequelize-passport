$(function() {

  var loginBtn = $("#login");
  var signUpBtn = $("#signup");

  loginBtn.on('click', (e) => {
    e.preventDefault();
    window.location = '/login'
  });

  signUpBtn.on('click', (e) => {
    e.preventDefault();
    window.location = '/signUp'
  });



})
