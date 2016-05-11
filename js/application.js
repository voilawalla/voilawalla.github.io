$(document).ready(function() {
  $(function() {
    $('.nav-tabs a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  });

  $(window).load(function() {
    $('#splashscreen').delay(3200).fadeOut("slow");
  });

  $(window).load(function() {
    $('#sec-home').delay(4200).fadeIn("slow");
  });

  $(function(){
 
    var $container = $('#grid');
  
    $container.imagesLoaded( function(){
      $container.masonry({
        itemSelector : '.grid-item'
      });
    });
  
  });
});