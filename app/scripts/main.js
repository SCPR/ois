/*jshint strict:false */

$(document).ready(function() {
    // Toggle modal windows
    $('[data-toggle="modal"]').click(function(){
      var modalTarget = $(this).attr('href');
      $(modalTarget).toggleClass('active');
      return false;
    });
      // Close all modals on ESC
      $(document).keyup(function(e) { 
          if (e.keyCode === 27) { 
              $('.modal').removeClass('active');
          } 
      });

    // Toggle top drawer
    $('[data-toggle="drawer-top"]').click(function(){
      var drawerTarget = $(this).data('target');
      $(drawerTarget).toggleClass('active');
      return false;
    });

});
