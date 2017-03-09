(function($) {
    "use strict";

        var mainMenu = require('./modules/main-menu')()(),
            scrollEvents = require('./modules/scroll-events')(),
            paralaxMain = require('./modules/paralax-main')(),
            anchors = require('./modules/anchors')(),
            preloader = require('./modules/preloader'),
            slider = require('./modules/slider')(),
            skills = require('./modules/skills')(),
            map = require('./modules/map')(),
            formValid = require('./modules/form-validation')();

        /********welcome-flip************/

        $('.welcome-header__button').on('click', function() {

            var $this = $(this);

            $('.flip-container').toggleClass('flipped');
            $this.fadeOut(300);

        });

        $('.about-card__back__nav__item:first-child').on('click', function(e) {
            e.preventDefault();
            $('.flip-container').toggleClass('flipped');
            $('.welcome-header__button').fadeIn(300);
        });


        /********link-submit************/
        $('.about-card__back__nav__item:last-child').on('click', function(e) {
            e.preventDefault();
            $('#about-card__form').submit();
        });
        /********blur-on-form************/
        
        function setBlur() {
            var
                imgWidth = $('.talks').width(),
                blur = $('.feedback__background-blur'),
                blurSection = $('.talks'),
                blurPosTop = blurSection.offset().top - blur.offset().top,
                blurPosLeft = blurSection.offset().left - blur.offset().left;
            blur.css({
                'background-position' : blurPosLeft + 'px' + ' ' + blurPosTop + 'px'
            });
        }
        
        if($('.feedback__background-blur').length) {
            $(window).resize(function() {
                setBlur();
            });

            $(window).on('load', function () {
                setBlur();
            });
        }

         /********blog-aside-move************/

         if ($('.articles-links').length) {
             var asideMover = $('div.articles-links:before'),
                 asideLinks = $('div.articles-links');

             asideLinks.click(function () {
                 $(this).toggleClass('active');
             })




         }


    preloader();
})(jQuery);