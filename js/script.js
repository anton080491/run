    //carusel

$(document).ready(function(){
    $('.carousel__inner').slick({
        centerMode: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/arrowleft.jpg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/slider/arrowright.jpg"></button>',
        dots: false,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
              }
            }]
    });



    //

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) { // кликаем 
              e.preventDefault(); //отменяем стандартное поведение браузера
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); // переключает тумблер
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); //переключает тумблер
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');
   

    // Modal

    $('[data-modal=consultation]').on('click', function() { //кликаем на кнопку с дата атрибутом data-modal=consultation
      $('.overlay, #consultation').fadeIn('slow');  // появление блоков (fadeIn) overlay и consultation
  });
  $('.modal__close').on('click', function() { //кликаем на крестик (блок modal__close) 
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow'); // убирание блоков (fadeOut) overlay, #consultation, #thanks, #order
  });

  $('.button__mini').each(function(i) {   //кликаем на кнопку с классом button__mini и берем во внимание все блоки (each)
      $(this).on('click', function() {   //клик на определенный блок (this)
          $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text());  //выбираем блок order  и в нем modal__subtitle в котором с помощью text заменяем текст на тот что стоит в  блоке .catalog-item__title в соответсвии с нажатой кнопкой eq(i). И заменяем в итоге text()
          $('.overlay, #order').fadeIn('slow');   //появление блоков (fadeIn) overlay, #order
      });
  });


    //validation

  
  $('#consultation-form').validate({
    rules: {
      name: {
        required: true,
        minlength: 15
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "введи имя!!",
        minlength: jQuery.validator.format("введи минимум {0} символов")
      },
      phone: "Введи номер!",
      email: {
        required: "Обязательно!!!",
        email: "Введи правильную почту!"
      }
    }
  });
  $('#order form').validate({
    rules: {
      name: {
        required: true,
        minlength: 15
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "введи имя!!",
        minlength: jQuery.validator.format("введи минимум {0} символов")
      },
      phone: "Введи номер!",
      email: {
        required: "Обязательно!!!",
        email: "Введи правильную почту!"
      }
    }
  });
  $('#consultation form').validate({
    rules: {
      name: {
        required: true,
        minlength: 15
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "введи имя!!",
        minlength: jQuery.validator.format("введи минимум {0} символов")
      },
      phone: "Введи номер!",
      email: {
        required: "Обязательно!!!",
        email: "Введи правильную почту!"
      }
    }
  });


  //mask
  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //scrolling  pageup appearance and disappearance

  $(window).scroll(function(){
    if($(this).scrollTop()>1600){
      $('.pageup').fadeIn();
    } else{
      $('.pageup').fadeOut();
    }
  });

  //smooth scrolling http://history-of-blog.ru/verstka-sajtov/plavnaya-prokrutka-do-yakorya-na-jquery-luchshij-skript/

  $("a[href^='#']").click(function(){                                       //smooth scrolling   
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

//send emails

  $('form').submit(function(e) {
    e.preventDefault();  //cancel a standard browser behavior
    $.ajax({                ////indicate where to send data
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {                                       
      $(this).find("input").val("");              //clear the input field
      $('#consultation,#order').fadeOut();           //close input windows
      $('.overlay,#thanks').fadeIn('slow');         //open the gratitude window, slowly
      $('form').trigger('reset');
    });
    return false;
  })

  //WOW for animate blocks

  new WOW().init();  //run WOW to animate blocks at the time of scrolling
 

});