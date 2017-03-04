module.exports = function () {
    if($('.skill__wrap').length) {
        
        $(window).scroll(function () {
         
            var skillsWrap = $('.skill__wrap'),
                skillList = $('.skill__list'),
                scroll = $(window).scrollTop();

            $.each(skillList, function (index, item) {
                var $this = $(this)

                if(scroll > $this.offset().top - $(window).innerHeight() - 250) {
                    $this.parents('.skill__wrap').addClass('active');

                    var skillItems =  $this.children('.skill__item')
                            .find("svg")
                            .children("circle:last-child"),
                        i=-1,
                        delayTime = 0;

                    var animateCircle = function () {
                        
                        if (i == skillItems.length - 1) return;
                        ++i;
                        delayTime += 200;
                        var animatePercent = 314 - ($(skillItems[i]).data("percent")/100)*314;

                        $this.children('.skill__item')
                            .delay(delayTime)
                            .animate({'opacity': '1'},500,"linear");

                        $(skillItems[i])
                            .delay(delayTime)
                            .animate({'stroke-dashoffset': animatePercent + ""},1300,"swing");

                        animateCircle();
                    }

                    animateCircle();
                }
            });
        });
    }
}