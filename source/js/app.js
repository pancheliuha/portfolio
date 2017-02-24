(function($) {
    "use strict";

        var mainMenu = require('./modules/main-menu')()(),
            paralaxMain = require('./modules/paralax-main')(),
            scrollEvents = require('./modules/scroll-events')(),
            anchors = require('./modules/anchors')(),
            preloader = require('./modules/preloader'),
            slider = require('./modules/slider')(),
            skills = require('./modules/skills')(),
            map = require('./modules/map')();

        /********welcome-flip************/

        $('.welcome-header__button').on('click', function() {

            var $this = $(this);

            $('.flip-container').toggleClass('flipped');
            $this.fadeOut(300);

        });

        $('.about-card__back__nav__link').on('click', function(e) {
            e.preventDefault();
            $('.flip-container').toggleClass('flipped');
            $('.welcome-header__button').fadeIn(300);
        });


        /********blur-on-form************/
        
        function setBlur() {
            var
                imgWidth = $('.talks').width(),
                blur = $('.feedback__background-blur'),
                blurSection = $('.talks'),
                blurPosTop = blurSection.offset().top - blur.offset().top,
                blurPosLeft = blurSection.offset().left - blur.offset().left;
                console.log(blurSection.offset().top, '!===!',blur.offset().top, '&&',blurPosTop );
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




    preloader();
})(jQuery);