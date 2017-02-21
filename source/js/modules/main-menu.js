module.exports = function() {
    var hamburger = $('.hamburger'),
        menu = $('.menu'),
        headerMenu = $('.header__top');

        return function() {
            hamburger.on('click', function () {
                $(this).toggleClass('active');

                menu.toggleClass('active').find('.menu__nav__item').each(function (index) {
                    if (index > 0) {
                        $(this).css('transition-duration',  0.3+ index/10 + 's');
                    }

                    else {
                        $(this).css('transition-duration',  '0.3s');
                    }
                });
                headerMenu.toggleClass('active');
            });
        }

}