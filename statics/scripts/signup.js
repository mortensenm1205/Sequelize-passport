$(function() {

  var first_name = $("#first_name");
  var last_name = $("#last_name");
  var user_name = $("#user_name");
  var email = $("#email");
  var password = $("#password");
  var submit = $("#submit");

  submit.on("click", (e) => {
    e.preventDefault();

    var dataToSend = {
      "first_name": first_name.val(),
      "last_name": last_name.val(),
      "user_name": user_name.val(),
      "email": email.val(),
      "password": password.val()
    }

    $.ajax({
      url: '/signUp',
      type: 'POST',
      data: dataToSend,
      success: (data) => {
        //as mentioned in my user-routes, autehnticate doesn't
        //actually redirect a route, i still have to do so here in my
        //post request to my server
        window.location = '/profile';
      }
    });



  })


});
