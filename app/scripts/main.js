/*jshint strict:false */

$(document).ready(function() {
    // Initialize fullpage.js
    $('#fullpage').fullpage({
      scrollingSpeed: 1400,
      easing: 'easeInQuart',
      css3: true,
      paddingTop: '70px',
      paddingBottom: '70px',

      onLeave: function(index, newIndex, direction){
        if (newIndex === 2 && direction === 'down'){
          $('#bg-0').addClass('zoom');
          $('.header__branding').removeClass('hidden');
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

});
