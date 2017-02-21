module.exports = function () {
    if ($('#mainSection').length) {
        var arrowDown = $('a[href="#mainSection"]'),
            arrowUp = $('.icon_arrow_up'),
            anchorTopValue = $('#mainSection').offset().top,
            anchorTopValueResize,

            /********blog-vars********/
            asideLink = $('.aside__link');


        $(window).resize(function () {
            anchorTopValueResize = $('#mainSection').offset().top;
        });

        function anchorDown(e) {
            e.preventDefault();
            $("body, html").animate({scrollTop: anchorTopValueResize || anchorTopValue}, 650);
        }

        function anchorUp(e) {
            $("body, html").animate({scrollTop: 0}, 650);
        }

        /********aside-blog anchor function********/

        function anchorLink(e) {
            e.preventDefault();
            var href = $(this).attr('href'),
                articlePos = $(href).offset().top;
            console.log(articlePos);
            $("body, html").animate({scrollTop: articlePos}, 650);
        }

        arrowDown.on('click', anchorDown);
        arrowUp.on('click', anchorUp);
        asideLink.on('click',anchorLink );
    }
}