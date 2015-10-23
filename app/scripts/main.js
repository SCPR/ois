/*jshint strict:false */

$(document).ready(function() {
    $('#fullpage').fullpage({
      scrollingSpeed: 1400,
      easing: 'easeInQuart',
      css3: true,
      paddingTop: '70px',
      paddingBottom: '70px',

      onLeave: function(index, newIndex, direction){
        if (newIndex === 2 && direction === 'down'){
          $('#bg-0').addClass('zoom');
        }
        else if (newIndex === 3 && direction === 'down'){
          $('#bg-0').removeClass('active');
        }
        else if(newIndex === 2 && direction === 'up'){
          $('#bg-0').addClass('active');
        }
        else if(newIndex === 1 && direction === 'up'){
          $('#bg-0').removeClass('zoom');
        }
      }
    });
    $('.next-slide').click(function(){
      $.fn.fullpage.moveSectionDown();
    });
    $('.prev-slide').click(function(){
      $.fn.fullpage.moveSectionUp();
    });
});
