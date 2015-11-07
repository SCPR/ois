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
      recordHistory: true,
      anchors:['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],

      afterLoad: function(anchorLink, index){
        if(index === 1 || index === 2 || index === 20) {
          $('#bg-0').addClass('active');
        }
        else {
          $('#bg-0').removeClass('active');
          $('.header__branding').removeClass('hidden');
          $('.pager--slides').removeClass('hidden');
        }
      },
      onLeave: function(index, newIndex, direction){
        if (newIndex === 1 && direction === 'up'){
          $('#bg-0').removeClass('zoom');
          $('.header__branding').addClass('hidden');
          $('.pager--slides').addClass('hidden');
        }
        else if (newIndex === 2 && direction === 'down'){
          $('#bg-0').addClass('zoom');
          $('.header__branding').removeClass('hidden');
          $('.pager--slides').removeClass('hidden');
        }
        else if (newIndex === 2 && direction === 'up'){
          $('#bg-0').addClass('active');
        }
        else if (newIndex === 3 && direction === 'down'){
          $('#bg-0').removeClass('active');
        }
        else if (newIndex === 4){
          $('#bg-1').addClass('active');
        }
        else if ((newIndex === 5 && direction === 'down') || (newIndex === 3 && direction === 'up')) {
          $('#bg-1').removeClass('active');
        }
        else if (newIndex === 7 ) {
          $('#bg-2').addClass('active');
        }
        else if ((newIndex === 8 && direction === 'down') || (newIndex === 6 && direction === 'up')) {
          $('#bg-2').removeClass('active');
        }
        else if (newIndex === 9 && direction === 'up'){
          $('#bg-3').removeClass('active');
        }
        else if (newIndex === 10 && direction === 'down'){
          $('#bg-3').addClass('active');
        }
        else if (newIndex === 10 && direction === 'up'){
          $('#bg-3').addClass('active');
          $('#bg-4').removeClass('active');
        }
        else if (newIndex === 11 && direction === 'down'){
          $('#bg-3').removeClass('active');
          $('#bg-4').addClass('active');
        }
        else if (newIndex === 11 && direction === 'up'){
          $('#bg-4').addClass('active');
          $('#bg-5').removeClass('active');
        }
        else if (newIndex === 12){
          $('#bg-4').removeClass('active');
          $('#bg-5').addClass('active');
        }
        else if (newIndex === 13 && direction === 'down'){
          $('#bg-5').removeClass('active');
        }
        else if (newIndex === 14 && direction === 'up') {
          $('#bg-6').removeClass('active');
        }
        else if (newIndex === 15 && direction === 'down'){
          $('#bg-6').addClass('active');
        }
        else if (newIndex === 15 && direction === 'up'){
          $('#bg-6').addClass('active');
          $('#bg-7').removeClass('active');
        }
        else if (newIndex === 16 && direction === 'down') {
          $('#bg-6').removeClass('active');
          $('#bg-7').addClass('active');
        }
        else if (newIndex === 16 && direction === 'up') {
          $('#bg-7').addClass('active');
        }
        else if (newIndex === 17 && direction === 'down'){
          $('#bg-7').removeClass('active');
        }
        else if (newIndex === 17 && direction === 'up'){
          $('#bg-8').removeClass('active');
        }
        else if (newIndex === 18 && direction === 'down'){
          $('#bg-8').addClass('active');
        }
        else if (newIndex === 18 && direction === 'up'){
          $('#bg-8').addClass('active');
          $('#bg-9').removeClass('active');
        }
        else if (newIndex === 19 && direction === 'down'){
          $('#bg-8').removeClass('active');
          $('#bg-9').addClass('active');
        }
        else if (newIndex === 19 && direction === 'up'){
          $('#bg-9').addClass('active');
          $('#bg-0').removeClass('active');
          $('.next-slide').show();
        }
        else if (newIndex === 20 && direction === 'down'){
          $('#bg-9').removeClass('active');
          $('#bg-0').addClass('active');
          $('.next-slide').hide();
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

});
