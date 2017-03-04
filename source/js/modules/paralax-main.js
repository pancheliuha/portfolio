module.exports = function () {
    $(document).ready(function () {

        var layer = $('.parallax__mouse-move').find('.layer');

        layer.map(function (key, value) {

            //bottom position for full layer view
            var bottomPosition = ((window.innerHeight / 2) * (key / 100));
            $(value).css({
                'bottom': '-' + bottomPosition + 'px'
            });
        });

        $(window).on('mousemove', function (e) {
            //mouse position
            var mouse_dx = (e.pageX);
            var mouse_dy = (e.pageY);

            //devide our page on for parts and define +X -X +Y -Y
            var w = (window.innerWidth / 2) - mouse_dx;
            var h = (window.innerHeight / 2) - mouse_dy;

            layer.map(function (key, value) {
                var bottomPosition = ((window.innerHeight / 2) * (key / 100));
                var widthPosition = w * (key / 180);
                var heightPosition = h * (key / 180);
               
                $(value).css({
                    'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
                });
            });
        });
    })
}