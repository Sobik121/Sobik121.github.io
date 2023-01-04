var slider = tns({
    container: '.slider__wrapper',
    items: 1,
    slideBy: 'page',
    navPosition: "bottom",
    autoplay: false,
    responsive: {
        320: {
            controls: false,
            nav: true
        },
        768: {
            nav: false,
            controls: true,
            controlsText: [
                '<img src="icons/left.svg" alt="Left arrow">',
                '<img src="icons/right.svg" alt="Right arrow">'
            ]
        }
    }
  });

$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog__header').eq(i).toggleClass('catalog__header_active');
                $('.catalog__detail').eq(i).toggleClass('catalog__detail_active');
            })
        })
    };

    toggleSlide('.catalog__more');
    toggleSlide('.detail_back');

    $('[data-modal=consultation]').on('click', function() {
        $('.modal-form, #consultation').fadeIn('slow');
    });
    $('.modal-form__close').on('click', function() {
        $('.modal-form, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-form__subtitle').text($('.catalog__subtitle').eq(i).text());
            $('.modal-form, #order').fadeIn('slow'); 
        })
    });
    
    function validForm(item) {
        $(item).validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            messages: {
                name: "Напишите ваше имя",
                phone: "Напишите ваш номер телефона",
                email: {
                    required: 'Нужно указать вашу электронную почту',
                    email: 'Указанная электронная почта должна быть в формате name@domain.com'
                }
            }
        });
    };

    validForm('#order .form');
    validForm('#consultation .form');
    validForm('#consultation-form');

    $('input[name=phone]').mask("+38 (999) 999-9999") 

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.modal-form #thanks').fadeIn(); 
            $("form").trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });

      new WOW().init();
});