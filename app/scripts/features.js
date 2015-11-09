/*jshint strict:false */

$(document).ready(function() {

  if($('.header--top').length) {
    // slide in '.header--fixed' when '.header--top' is out of view
    var waypoint = new Waypoint.Inview({
      element: $('.header--top'),
      exited: function(direction) {
        $('.header--fixed').addClass('active');
      },
      enter: function(direction) {
        $('.header--fixed').removeClass('active');
      }
    })
  }
});
