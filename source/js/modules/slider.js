module.exports = function () {

    /********set main slider variables********/

    var slider = $(".slider"),
        NavLeft = $(".slider__nav-item_left"),
        NavRight = $(".slider__nav-item_right"),
        Slideshow = $(".slider__project-image"),
        nextItem = NavLeft.find(".slider__item.left"),
        previousItem = NavRight.find(".slider__item.right"),
        slideshowItem = Slideshow.find(".slider__item.slideshow"),
        descriptionItem = slider.find(".slider-inner");

    /********set navigation variables begin********/

        //navCounters
    var previousCounter = 2,
        nextCounter = 0,
        slideshowCounter = 1,
        arrayOfCounters = [previousCounter, nextCounter,slideshowCounter];

        //hide and show properties
    var topUnder = {'top' : '-100%'},
        topAbove = {'top' : '100%'},
        top0 = {'top' : '0'},
        opacityNone = {'opacity' : '0'},
        opacityFull = {'opacity' : '1'};



    /********set navigation variables end********/

    NavRight.on('click',navigation);
    NavLeft.on('click',navigation);

    function navigation(e) {

        var descriptionInner = moveItems(e);
        animateLetters(descriptionInner);
    }

    function moveItems(e) {

        if (e.currentTarget.className == "slider__nav-item slider__nav-item_left") {
            /********inc counters********/
            $.each(arrayOfCounters, function (index) {
                ++arrayOfCounters[index];

                if (arrayOfCounters[index] > nextItem.length - 1) {
                    arrayOfCounters[index] = 0;
                }
            });
        } else {
            /********dec counters********/
            $.each(arrayOfCounters, function (index) {
                --arrayOfCounters[index];

                if (arrayOfCounters[index] < 0) {
                    arrayOfCounters[index] = nextItem.length - 1;
                }
            });
        }

        NavRight.attr('disabled', 'disabled');
        NavLeft.attr('disabled', 'disabled');

        /********set active items********/
        var nextItemActive = slider.find(".slider__item.right.active"),
            previousItemActive = slider.find(".slider__item.left.active"),
            slideshowItemActive = slider.find(".slider__item.slideshow.active"),
            descriptionItemActive = slider.find(".slider-inner.active");

        /********set next requires items********/
        var nextItemRequire = nextItem.eq(arrayOfCounters[0]),
            previousItemRequire = previousItem.eq(arrayOfCounters[1]),
            slideshowItemRequire = slideshowItem.eq(arrayOfCounters[2]),
            descriptionItemRequire = descriptionItem.eq(arrayOfCounters[2]);

        /********hide items********/

        function hideActiveItems(avtiveItem, hideProperty) {
            avtiveItem.animate(hideProperty, 400);
        }

        hideActiveItems(nextItemActive, topUnder);
        hideActiveItems(previousItemActive, topAbove);
        hideActiveItems(slideshowItemActive, opacityNone);
        hideActiveItems(descriptionItemActive, opacityNone);

        /********show next items********/
        function showActiveItems(unactiveItem, activeItem, showProperty, activeHideProperty) {
            unactiveItem.animate(showProperty, 400, function () {
                activeItem.removeClass('active').css(activeHideProperty);
                $(this).addClass('active');
                NavRight.removeAttr('disabled');
                NavLeft.removeAttr('disabled');
            });
        }

        showActiveItems(nextItemRequire, nextItemActive, top0, topAbove);
        showActiveItems(previousItemRequire, previousItemActive, top0, topUnder);
        showActiveItems(descriptionItemRequire, descriptionItemActive, opacityFull, opacityNone);
        showActiveItems(slideshowItemRequire, slideshowItemActive, opacityFull, opacityNone);

        return descriptionItemRequire;
    }
    
    /**********animate letters in description*********/


    function animateLetters(descIn) {

        //animations letters vars
        var descriptionInner = descIn,
            descrBlock = descriptionInner.find('.slider__description-text'),
            technologiesBlock = descriptionInner.find('.slider__technologies'),
            stringDescr = descrBlock.text().trim(),
            stringTechnologies = technologiesBlock.text().trim(),
            stringDescrArray = stringDescr.split(''),
            stringTechnologiesArray = stringTechnologies.split(''),
            wordDescr = '',
            wordTechnologies = '';


        function animateString(strArr, word, block) {
            block.html("");
            //wrap letters in span

            strArr.forEach(function (letter, i) {

                var text = '<span class="letter-span">' + letter + '</span>';

                if (i == 0) {
                    text = '<span class="word-span">' + text;
                }

                if (letter == " " || letter == "&nbsp;") {
                    text = '</span><span class="letter-span_space"> </span><span class="word-span">';
                }

                if (i == strArr.length - 1) {
                    text = text + '</span>';
                }

                word += text;
            });

            block.html(word);


         //   console.log('block.html()',block.children('.word-span').length);

            var letter = block.find('.letter-span'),
                counter = 0,
                timer,
                duration = 800 / strArr.length;


            //show and animate every letter
            function showLetters() {
                var currenLetter = letter.eq(counter);

                currenLetter.addClass('active');

                counter++;
                if (strArr.length == counter) {
                    return;
                }

                if (typeof timer != 'undefined') {
                    clearTimeout(timer);
                }

                timer = setTimeout(showLetters, duration);
            }

            showLetters();

        }

        animateString(stringDescrArray, wordDescr, descrBlock);
        animateString(stringTechnologiesArray, wordTechnologies, technologiesBlock);
    }
}