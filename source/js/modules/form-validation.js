module.exports = function () {

    //feedback form
    if($('#formFeedback').length) {

        $('input#name, input#email, textarea#message').unbind().on('keyup blur', function (e) {

            //define id and value of inputs
            var id = $(this).attr('id'),
                val = $(this).val(),
                tooltip = $(this).next('.error-tooltip');

            if (!$(this).hasClass('valid') && !$(this).hasClass('error')) {
                $(this).addClass('error');
            }

            //hide Tooltips
            if (tooltip.hasClass('show')) {
                tooltip.removeClass('show').addClass('hide');
            }

            switch (id) {

                //check name
                case 'name':
                    var regName = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ]+$/;

                    if (val.length > 2 && val != '' && regName.test(val)) {
                        $(this).removeClass('error').addClass('valid');
                    } else {
                        $(this).removeClass('valid').addClass('error');
                    }

                    if (val.length == 0) {
                        $(this).removeClass('error');
                    }

                    break;

                //check email
                case 'email':
                    var regEmail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

                    if (val != '' && regEmail.test(val)) {
                        $(this).removeClass('error').addClass('valid');
                    } else {
                        $(this).removeClass('valid').addClass('error');
                    }

                    if (val.length == 0) {
                        $(this).removeClass('error');
                    }

                    break;

                    //check message
                case 'message':

                    if (val.length > 5 && val.length < 1000) {
                        $(this).removeClass('error').addClass('valid');
                    } else {
                        $(this).removeClass('valid').addClass('error');
                    }

                    if (val.length == 0) {
                        $(this).removeClass('error');
                    }

                    break;
            }
        });


        //reset form to original state
        $('#reset').click(function (e) {

            $('#formFeedback').find('.error, .valid').each(function () {

                if ($(this).hasClass('error')) {
                    $(this).removeClass('error');
                }

                if ($(this).hasClass('valid')) {
                    $(this).removeClass('valid');
                }
            });

            if ($('.error-tooltip').hasClass('show')) {
                $('.error-tooltip').removeClass('show');
            }
        });


        //send letter with AJAX

        $('form#formFeedback').submit(function (e) {

            e.preventDefault();

            if($('.valid').length == 3) {

                $.ajax({
                    url: "send.php",
                    type: "POST",
                    data: $(this).serialize(),

                    beforeSend: function (xhr, textStatus) {
                        $('form#formFeedback:input').attr('disabled','disabled');
                    },

                    success: function (response) {
                        $('form#formFeedback:input').removeAttr('disabled');
                        showPopup('Данные отправлены');
                        console.log(response);
                    },

                    error: function (response) {
                        $('form#formFeedback:input').removeAttr('disabled');
                        showPopup('Ошибка ответа от сервера');
                        console.log(response);
                    }
                });
            }

            else {
                showPopup('Пожалуйста, проверьте корректность введенных данных');


                $('input#name, input#email, textarea#message').each(function () {

                    //add Error class to inputs
                    if (!$(this).hasClass('valid') && !$(this).hasClass('error')) {
                        $(this).addClass('error');
                    }

                    //show tooltip
                    if($(this).hasClass('error')) {
                        $(this).next('.error-tooltip').addClass('show');
                    }
                });
            }
        });


    }

    function showPopup(popupText) {
        var overlay = $('.popup__overlay'),
            popupText = popupText,
            timer,
            popupClose = $('.popup__inner').find('.popup__close'),
            popupInner = $('.popup__inner');


        popupInner.find('.popup__text').html(popupText);

        overlay.fadeIn(400, function () {

            if (popupInner.hasClass('rollOut')) {
                popupInner.removeClass('rollOut');
            }

            popupInner.css('display', 'block').addClass('rollIn');
            overlay.css('display', 'block');

        });

        popupClose.click(function () {

            //hidePopup
            hidePopup();
            if (timer) {
                clearTimeout(timer);
            }
        });

        timer = setTimeout(hidePopup, 3000);

        function hidePopup() {

            popupInner.removeClass('rollIn').addClass('rollOut');

            overlay.fadeOut(700, function () {
                popupInner.css('display','none');
                overlay.css('display', 'none');
            });
        }
    }
}