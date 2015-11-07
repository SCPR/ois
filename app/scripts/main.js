/*jshint strict:false */

$(document).ready(function() {
    // Toggle modal windows
    $('[data-toggle="modal"]').click(function(){
      var modalTarget = $(this).attr('href');
      $(modalTarget).toggleClass('active');
      toggleViewportScroll();
      return false;
    });
      // Close all modals on ESC
      $(document).keyup(function(e) { 
          if (e.keyCode === 27) { 
              $('.modal').removeClass('active');
              toggleViewportScroll();
          } 
      });

    // Toggle top drawer
    $('[data-toggle="drawer-top"]').click(function(){
      var drawerTarget = $(this).data('target');
      $(drawerTarget).toggleClass('active');
      toggleViewportScroll();
      return false;
    });

    // Prevent window scroll when modals or overlays are engaged
    function toggleViewportScroll() {
      if ($('body').hasClass('locked')) {
        $('html').css('overflow', 'scroll');
        $('body').removeClass('locked').unbind('touchmove');
      }
      else {
        $('html').css('overflow', 'hidden');
        $('body').addClass('locked').bind('touchmove', function(e) {
            e.preventDefault()
        });
      }
    } 
});
