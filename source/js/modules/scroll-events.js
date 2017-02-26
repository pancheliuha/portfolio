module.exports = function () {



    $(window).scroll(function () {

        var wScroll = $(window).scrollTop();
        console.log('wScroll',wScroll);
        /**********parallax-vars**********/
        var scrollLayer = $('.parallax__scroll').find('.layer'),
            user = $('.header__content'),
            portfolioSvg = $('.portfolio-svg-wrap');

        /**********blog-vars*********/
        var headerHeight = parseInt($('.header-wrap').css('height')),
            articleLinks = $('.articles-links'),
            articles = $('.articles-content').find('.article');

        /**********parallax-scroll-function**********/
        function parallax() {

            function slide(block, strafeAmount) {
                var strafe = -strafeAmount + '%',
                    transformY = 'translate3d(0,' + strafe + ',0)';

                block.css({
                    'transform' : transformY
                });
            }

            scrollLayer.map(function (key, layer) {
                var strAm = wScroll/(50 - key*3.5);
                slide($(layer), strAm);
            });


            slide(portfolioSvg, wScroll / 20);
            slide(user, wScroll / 3);

        }

        parallax();

        /**********blog-fixed**********/
        $(window).resize(function() {
            headerHeight = $('.header-wrap').css('height');
        });


        if(wScroll > headerHeight) {
            articleLinks.addClass('fixed');
        } else if (articleLinks.hasClass('fixed') && wScroll < headerHeight) {
            articleLinks.removeClass('fixed');
        }


        /**********set-active blog links**********/
        $.each(articles,function (index, item) {

            var $this = $(this),
                artOffsetTop = $this.offset().top,
                artOffsetBottom = artOffsetTop + $this.outerHeight(),
                id = '#' + $this.attr('id'),
                artLink = $("a[href='" + id + "']");
            

            if(wScroll + 1 >=artOffsetTop && wScroll + 1 <= artOffsetBottom) {
                if(!artLink.hasClass('active')) {
                    artLink.addClass('active');
                }
            } else {
                artLink.removeClass('active');
            }
                console.log('artOffsetTop' ,artOffsetTop, 'artOffsetBottom' ,artOffsetBottom);
        });


        /*********fade-in and fade-out aimations**********/

        //set talks variables
        if($('.talks').length) {
            var talks = $('.talks'),
                talksHeader = talks.find('.talks__header'),
                talksItems = talks.find('.talks__content'),

                //offsets
                talksHeaderOffset = talksHeader.offset().top,
                talksItemsOffset = talksItems.offset().top;
                console.log(talksHeaderOffset, talksItemsOffset);

            animateScroll(talksHeader, talksHeaderOffset, "fadeInFromBottom");
            animateScroll(talksItems, talksItemsOffset, "fadeInFromBottom");
        }
        console.log('!!!!!!', ($(window).height()));
        function animateScroll(block, offset, animationName) {
            if (wScroll > (offset - $(window).height())) {
                block.addClass(animationName);
            }
        }
    });


}