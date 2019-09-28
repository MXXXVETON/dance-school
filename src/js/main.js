$(function() {
  // sliders
  initSlider('.benefit', 768)
  initSlider('.direction__content', 768)
  initSlider('.slider-comments');
  initSlider('.inner-foto-slider');
  initSlider('.more-info__direction_slider');
  initSlider('.more-info__other-service_slider');
  abonementSliderInit('.individual-abonements-slider', '.individual-abonements-dots');
  abonementSliderInit('.groups-abonements-slider', '.groups-abonements-dots');

  // slow scrolling to element by ancor link
  $(document).on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - $('.nav').height()
    }, 1200);
  })

  // abonements tabs
  $(document).on('click', '.abonements-toggler [data-tab]', function(e) {
    e.preventDefault();

    const sectionId = $(this).data('tab');

    $('.abonements-toggler [data-tab]').removeClass('active');
    $(this).addClass('active');

    $('.abonements').removeClass('active');
    $(sectionId).addClass('active');

    abonementSliderInit('.individual-abonements-slider', '.individual-abonements-dots');
    abonementSliderInit('.groups-abonements-slider', '.groups-abonements-dots');
  })

  function abonementSliderInit(sliderSelector, dotsSelector) {
    if ($(sliderSelector).hasClass('slick-initialized')) {
      $(sliderSelector).slick('unslick');
    }

    initSlider(sliderSelector, 768, function(slider) {
      // on dots click
      $(document).on('click', `${dotsSelector} [data-abonement-dot]`, function(e) {
        e.preventDefault();
  
        $(`${dotsSelector} [data-abonement-dot]`).removeClass('active');
  
        const el = $(this).addClass('active');
        const slideIndex = el.attr('data-abonement-dot');
  
        slider.slick('slickGoTo', slideIndex);
      })
      // on slider change
      slider.on('afterChange', function(event, slick, count) {
        $(`${dotsSelector} [data-abonement-dot]`).removeClass('active');
        $(`${dotsSelector} [data-abonement-dot="${count}"]`).addClass('active');
      })
    })
  }
})

/**
 * @param {string} sliderSelecter - slider container selector
 * @param {number} maxScreenSize - max screen width for init slider. all sizes if empty
 * @param {(slider) => void} callback - fires after slider init. slider arg is inied slick slider
 */
function initSlider(sliderSelecter, maxScreenSize, callback) {
  if (!!maxScreenSize && $(document).width() > maxScreenSize) {
    return false;
  }

  const slider = $(sliderSelecter);
  const totalCounter = slider.children().length;
  const arrowPrev = `${sliderSelecter.slice(1)}-prev-arrow`;
  const arrowNext = `${sliderSelecter.slice(1)}-next-arrow`;
  const counter = `${sliderSelecter.slice(1)}-current-slide`

  slider.slick({
    arrows: false,
  })

  $(sliderSelecter).append(`
    <div class="slider-controls">
      <button class="slider-controls__arrow ${arrowPrev}"><img src="./img/controllers/arrow-left.svg" /></button>
      <span class="slider-controls__counter ${counter}"><span>1</span>/${totalCounter}</span>
      <button class="slider-controls__arrow ${arrowNext}"><img src="./img/controllers/arrow-right.svg" /></button>
    </div>
  `)

  $(document)
    .on('click', `.${arrowPrev}`, function() {
      slider.slick('slickPrev');
    })
    .on('click', `.${arrowNext}`, function() {
      slider.slick('slickNext');
    })

  slider.on('afterChange', function(event, slick, count) {
    $(`.${counter}`).find('span').html(count + 1)
  })

  if (typeof callback === 'function') {
    callback(slider)
  }
}

function startPlayVideo(videoId) {
  const video = document.getElementById(videoId);

  video.play();

  $(video).prop('controls', true).closest('div').addClass('started');
}