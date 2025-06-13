document.addEventListener('DOMContentLoaded', function() {
  var burger = document.getElementById('burger-btn');
  var menu = document.getElementById('mobile-menu');

  burger.addEventListener('click', function() {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.classList.toggle('noscroll');
  });
});
