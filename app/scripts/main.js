/*jshint strict:false */

$(document).ready(function() {
    // Initialize fullpage.js
    $('#fullpage').fullpage({
      scrollingSpeed: 1600,
      easing: 'easeInQuart',
      css3: true,
      paddingTop: '70px',
      paddingBottom: '70px',
      animateAnchor: false,
      anchors:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],

      onLeave: function(index, newIndex, direction){
        if (newIndex === 2 && direction === 'down'){
          $('#bg-0').addClass('zoom');
          $('.header__branding').removeClass('hidden');
          $('.pager--slides').removeClass('hidden');
        }
        else if (newIndex === 3 && direction === 'down'){
          $('#bg-0').removeClass('active');
        }
        else if(newIndex === 2 && direction === 'up'){
          $('#bg-0').addClass('active');
        }
        else if(newIndex === 1 && direction === 'up'){
          $('#bg-0').removeClass('zoom');
          $('.header__branding').addClass('hidden');
          $('.pager--slides').addClass('hidden');
        }
      }
    });

    // Hook up custom nav UI for advancing fullpage sections
    $('.next-slide').click(function(){
      $.fn.fullpage.moveSectionDown();
    });
    $('.prev-slide').click(function(){
      $.fn.fullpage.moveSectionUp();
    });

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
