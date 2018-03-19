$(function() {

  var logout = $("#logout");
  var uploadImg = $("#upload_image");

  logout.on('click', (e) => {
    e.preventDefault();
    window.location = '/logout';
  })

  uploadImg.on('click', (e) => {
    e.preventDefault();
    window.location = '/upload_img';
  })

});
