$(function() {

  var first_name = $("#first_name");
  var last_name = $("#last_name");
  var user_name = $("#user_name");
  var email = $("#email");
  var password = $("#password");
  var fav_color = $("#fav_color");
  var submit = $("#submit");

  submit.on("click", (e) => {
    e.preventDefault();

    var dataToSend = {
      "first_name": first_name.val(),
      "last_name": last_name.val(),
      "user_name": user_name.val(),
      "email": email.val(),
      "password": password.val(),
      "fav_color": fav_color.val()
    }

    $.ajax({
      url: '/signUp',
      type: 'POST',
      data: dataToSend,
      success: (data) => {
        window.location = '/profile';
      }
    });



  })


});
