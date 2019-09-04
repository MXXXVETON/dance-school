// Slider's
$(document).ready(function(){
  const slider = $('.slider-comments');
  const prev = $('.prev');
  const next = $('.next');

  slider.slick({
    prevArrow: prev,
    nextArrow: next,
  });

  slider.on('afterChange', function(event, slick, currentSlide){
    $("#cp").text(currentSlide + 1);
 });

  const windowWidth = $(window).width();
  if(windowWidth < 768){
    //  sliders
    let sliderBenefits = $('.benefit');
    let sliderDirection = $('.direction__content');

    // controllers
    let prev = $('.prev');
    let next = $('.next');
    
    //  slick elements
      sliderBenefits.slick({
        prevArrow: prev,
        nextArrow: next,
      });
      
      sliderBenefits.on('afterChange', function(event, slick, currentSlide){
        $("#benefitsCs").text(currentSlide + 1);
      });

      sliderDirection.slick({
        prevArrow: prev,
        nextArrow: next,
      });

      sliderDirection.on('afterChange', function(event, slick, currentSlide){
          $("#directionCs").text(currentSlide + 1);
      });
   }
});




// google map
var map;
const fitnesCenter = {lat: 55.757902, lng: 37.582900};
const castomMarker = $('.castom-marker');

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: fitnesCenter,
      zoom: 15
    });

    var marker = new google.maps.Marker({
      position: fitnesCenter,
      map: map,
      title: "Anna Hals's",
      // icon: castomMarker,
    });
  }