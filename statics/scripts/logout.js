$(function() {

  var logout = $("#logout");

  logout.on('click', (e) => {
    e.preventDefault();
    window.location = '/logout';
  })

});
