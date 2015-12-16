(function ($) {
    

    $.fn.menuCarousel = function (options) {
        var length = $(this).children().length;
        var tagName = $(this).children().prop('tagName');
        var current = 1;
        var i = 0;
        var running = false;
        var scrollSpeed = options.scrollSpeed ? options.scrollSpeed : 500;
        var parent = this;

        if (length == 0) {
            return false;
        }

        if (length < 7) {
            var children = $(this).children();
            for (var j = 0; j < (8 - length); j++) {
                $(children[7 % j]).clone(true).insertBefore($(parent).children().last().prev());
            }
        }

        length = $(this).children().length;

        $(this).children().each(function () {
            i++;
            switch (i) {
                case 1:
                    $(this).addClass('front-image');
                    break;
                case length:
                    $(this).addClass('side-image-before');
                    $(this).addClass('side-image');
                    break;
                case 2:
                    $(this).addClass('side-image-after');
                    $(this).addClass('side-image');
                    break;
                case length - 1:
                    $(this).addClass('further-image-before');
                    $(this).addClass('further-image');
                    break;
                case 3:
                    $(this).addClass('further-image-after');
                    $(this).addClass('further-image');
                    break;
                default:
                    $(this).addClass('hidden-image');
                    $(this).addClass('further-image');
                    break;
            }

            $(this).attr('data-number', i);
        });

        $(this).children().on({
            click: function () {
                var displayWidth = $(window).width();
                var element = this;
                if (running === true) {
                    return false;
                }
                if (options.widthForOne && (displayWidth <= options.widthForOne)) {
                    return false;
                }
                if (!$(element).hasClass('front-image')) {
                    moveTo($(element).attr('data-number'));
                    animationCallback(element);
                }
            }
        });

        if (options.moveLeft) {
            $(options.moveLeft).on({
                click: function () {
                    if (running === true) {
                        return false;
                    }
                    var position;
                    if (current == 1) {
                        position = length;
                    } else {
                        position = current - 1;
                    }
                    moveTo(position);
                    animationCallback(tagName + '[data-number="' + position + '"]');
                }
            });
        }

        if (options.moveRight) {
            $(options.moveRight).on({
                click: function () {
                    if (running === true) {
                        return false;
                    }
                    var position;
                    if (current == length) {
                        position = 1;
                    } else {
                        position = current - (-1);
                    }
                    moveTo(position);
                    animationCallback(tagName + '[data-number="' + position + '"]');
                }
            });
        }

        function animationCallback(element) {
            if (options.animationCallback) {
                options.animationCallback(element);
            }
            return false;
        }

        function moveTo(slide) {
            var diff = current - slide;
            var frontPosition = $('.menu-carousel .front-image').css('left');
            var frontWidth = $('.menu-carousel .front-image').css('width');
            var sideBeforePosition = $('.menu-carousel .side-image-before').css('left');
            var sideAfterPosition = $('.menu-carousel .side-image-after').css('left');
            var furtherBeforePosition = $('.menu-carousel .further-image-before').css('left');
            var furtherAfterPosition = $('.menu-carousel .further-image-after').css('left');
            var displayWidth = $(window).width();
            var animationOptions = {};

            //alert(diff);

            if (running === true) {
                return false;
            }

            switch (diff) {
                //От правого края к центру
                case -2:
                case (length - 2):
                    if (!$(tagName + '[data-number="' + slide + '"]').next().hasClass('hidden-image')) {
                        $(parent).children().last().after($(parent).children().first());
                    }
                    if (!$(tagName + '[data-number="' + slide + '"]').next().next().hasClass('hidden-image')) {
                        $(parent).children().last().after($(parent).children().first());
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next()
                            .show(0)
                            .css('margin-top', '6%')
                            .addClass('further-image-after')
                            .removeClass('hidden-image')
                            .removeAttr('style');
                    running = true;
                    $(tagName + '[data-number="' + slide + '"]').css('z-index', '400').animate({
                        "width": frontWidth,
                        "margin-top": "0",
                        "left": frontPosition
                    }, scrollSpeed * 1.5, function () {
                        $(this).addClass('front-image')
                                .removeClass('further-image')
                                .removeClass('hidden-image')
                                .removeClass('further-image-after')
                                .removeAttr('style');
                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().show()
                            .css('z-index', '200')
                            .css('left', furtherAfterPosition)
                            .animate({
                                "width": "25%",
                                "margin-top": "3%",
                                "left": sideAfterPosition
                            }, scrollSpeed * 1.5, function () {
                                $(this).addClass('side-image')
                                        .addClass('side-image-after')
                                        .removeClass('further-image')
                                        .removeClass('hidden-image')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]').prev().css('z-index', '300').animate({
                        "left": sideBeforePosition
                    }, scrollSpeed * 1.5, function () {
                        $(this).addClass('side-image-before')
                                .removeClass('side-image-after')
                                .removeAttr('style');

                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev().prev()
                            .animate({
                                "width": "16.7%",
                                "margin-top": "6%",
                                "left": furtherBeforePosition,
                                "opacity": "0"
                            }, scrollSpeed * 1.5, function () {
                                $(this).addClass('further-image')
                                        .addClass('hidden-image')
                                        .removeClass('side-image')
                                        .removeClass('side-image-before')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev().prev().prev()
                            .animate({
                                "opacity": "hide"
                            }, scrollSpeed * 0.75, function () {
                                $(this).addClass('hidden-image')
                                        .removeClass('further-image-before')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev()
                            .animate({
                                "width": "16.7%",
                                "margin-top": "6%",
                                "left": furtherBeforePosition
                            }, scrollSpeed * 1.5, function () {
                                $(this).removeClass('front-image')
                                        .addClass('further-image')
                                        .addClass('further-image-before')
                                        .removeAttr('style').delay(scrollSpeed / 5)
                                        .queue(function () {
                                            running = false;
                                            current = slide;
                                            $(this).dequeue();
                                        });
                            });
                    break;
                    //От левого края к центру
                case 2:
                case -(length - 2):
                    if (!$(tagName + '[data-number="' + slide + '"]').prev().hasClass('hidden-image')) {
                        $(parent).children().first().before($(parent).children().last());
                    }
                    if (!$(tagName + '[data-number="' + slide + '"]').prev().prev().hasClass('hidden-image')) {
                        $(parent).children().first().before($(parent).children().last());
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev()
                            .show(0)
                            .css('margin-top', '6%')
                            .addClass('further-image-before')
                            .removeClass('hidden-image')
                            .removeAttr('style');
                    running = true;
                    $(tagName + '[data-number="' + slide + '"]').css('z-index', '400').animate({
                        "width": frontWidth,
                        "margin-top": "0",
                        "left": frontPosition
                    }, scrollSpeed * 1.5, function () {
                        $(this).addClass('front-image')
                                .removeClass('further-image')
                                .removeClass('hidden-image')
                                .removeClass('further-image-before')
                                .removeAttr('style');
                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().show()
                            .css('z-index', '200')
                            .css('left', furtherBeforePosition)
                            .animate({
                                "width": "25%",
                                "margin-top": "3%",
                                "left": sideBeforePosition
                            }, scrollSpeed * 1.5, function () {
                                $(this).addClass('side-image')
                                        .addClass('side-image-before')
                                        .removeClass('further-image')
                                        .removeClass('hidden-image')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]').next().css('z-index', '300').animate({
                        "left": sideAfterPosition
                    }, scrollSpeed * 1.5, function () {
                        $(this).addClass('side-image-after')
                                .removeClass('side-image-before')
                                .removeAttr('style');

                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next().next()
                            .animate({
                                "width": "16.7%",
                                "margin-top": "6%",
                                "left": furtherAfterPosition,
                                "opacity": "0"
                            }, scrollSpeed * 1.5, function () {
                                $(this).addClass('further-image')
                                        .addClass('hidden-image')
                                        .removeClass('side-image')
                                        .removeClass('side-image-after')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next().next().next()
                            .animate({
                                "opacity": "hide"
                            }, scrollSpeed * 0.75, function () {
                                $(this).addClass('hidden-image')
                                        .removeClass('further-image-after')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next()
                            .css('z-index', '250')
                            .animate({
                                "width": "16.7%",
                                "margin-top": "6%",
                                "left": furtherAfterPosition
                            }, scrollSpeed * 1.5, function () {
                                $(this).removeClass('front-image')
                                        .addClass('further-image')
                                        .addClass('further-image-after')
                                        .removeAttr('style').delay(scrollSpeed / 5)
                                        .queue(function () {
                                            running = false;
                                            current = slide;
                                            $(this).dequeue();
                                        });
                            });
                    break;
                case -(length - 1):
                case 1:
                    if (!$(tagName + '[data-number="' + slide + '"]').prev().prev().hasClass('hidden-image')) {
                        $(parent).children().first().before($(parent).children().last());
                    }
                    running = true;
                    $(tagName + '[data-number="' + slide + '"]').css('z-index', '400').animate({
                        "width": frontWidth,
                        "margin-top": "0",
                        "left": frontPosition,
                        "opacity": "show"
                    }, scrollSpeed, function () {
                        $(this).addClass('front-image')
                                .removeClass('side-image')
                                .removeClass('side-image-before')
                                .removeAttr('style');
                    });
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "width": "25%",
                            "margin-top": "3%",
                            "left": sideBeforePosition
                        };
                    } else {
                        animationOptions = {
                            "width": "25%",
                            "margin-top": "3%",
                            "left": sideBeforePosition,
                            "opacity": "show"
                        };
                    }
                    $(tagName + '[data-number="' + slide + '"]').prev().css('z-index', '200')
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('side-image')
                                        .addClass('side-image-before')
                                        .removeClass('further-image')
                                        .removeClass('further-image-before')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]').next().animate({
                        "width": "25%",
                        "margin-top": "3%",
                        "left": sideAfterPosition
                    }, scrollSpeed, function () {
                        $(this).addClass('side-image')
                                .addClass('side-image-after')
                                .removeClass('front-image')
                                .removeAttr('style');
                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev().addClass('further-image-before')
                            .removeClass('hidden-image')
                            .removeAttr('style');
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "width": "16.7%",
                            "margin-top": "6%",
                            "left": furtherAfterPosition,
                        };
                    } else {
                        animationOptions = {
                            "width": "16.7%",
                            "margin-top": "6%",
                            "left": furtherAfterPosition,
                            "opacity": "0",
                        };
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next()
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('further-image')
                                        .addClass('further-image-after')
                                        .removeClass('side-image')
                                        .removeClass('side-image-after')
                                        .removeAttr('style').delay(scrollSpeed / 5)
                                        .queue(function () {
                                            running = false;
                                            current = slide;
                                            $(this).dequeue();
                                        });
                            });
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "opacity": "toggle"
                        };
                    } else {
                        animationOptions = {};
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next().next()
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('hidden-image')
                                        .removeClass('further-image-after')
                                        .removeAttr('style');
                            });
                    break;
                case (length - 1):
                case -1:
                    if (!$(tagName + '[data-number="' + slide + '"]').next().next().hasClass('hidden-image')) {
                        $(parent).children().last().after($(parent).children().first());
                    }
                    running = true;
                    $(tagName + '[data-number="' + slide + '"]').css('z-index', '400').animate({
                        "width": frontWidth,
                        "margin-top": "0",
                        "left": frontPosition,
                        "opacity": "show"
                    }, scrollSpeed, function () {
                        $(this).addClass('front-image')
                                .removeClass('side-image')
                                .removeClass('side-image-after')
                                .removeAttr('style');
                    });
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "width": "25%",
                            "margin-top": "3%",
                            "left": sideAfterPosition,
                        };
                    } else {
                        animationOptions = {
                            "width": "25%",
                            "margin-top": "3%",
                            "left": sideAfterPosition,
                            "opacity": "show"
                        };
                    }
                    $(tagName + '[data-number="' + slide + '"]').next().css('z-index', '200')
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('side-image')
                                        .addClass('side-image-after')
                                        .removeClass('further-image')
                                        .removeClass('further-image-after')
                                        .removeAttr('style');
                            });
                    $(tagName + '[data-number="' + slide + '"]').prev().animate({
                        "width": "25%",
                        "margin-top": "3%",
                        "left": sideBeforePosition
                    }, scrollSpeed, function () {
                        $(this).addClass('side-image')
                                .addClass('side-image-before')
                                .removeClass('front-image')
                                .removeAttr('style');
                    });
                    $(tagName + '[data-number="' + slide + '"]')
                            .next().next().addClass('further-image-after')
                            .removeClass('hidden-image')
                            .removeAttr('style');
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "width": "16.7%",
                            "margin-top": "6%",
                            "left": furtherBeforePosition
                        };
                    } else {
                        animationOptions = {
                            "width": "16.7%",
                            "margin-top": "6%",
                            "left": furtherBeforePosition,
                            "opacity": "0"
                        };
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev()
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('further-image')
                                        .addClass('further-image-before')
                                        .removeClass('side-image')
                                        .removeClass('side-image-before')
                                        .removeAttr('style').delay(scrollSpeed / 5)
                                        .queue(function () {
                                            running = false;
                                            current = slide;
                                            $(this).dequeue();
                                        });
                            });
                    if (options.widthForThree && (displayWidth > options.widthForThree)) {
                        animationOptions = {
                            "opacity": "toggle"
                        };
                    } else {
                        animationOptions = {};
                    }
                    $(tagName + '[data-number="' + slide + '"]')
                            .prev().prev().prev()
                            .animate(animationOptions, scrollSpeed, function () {
                                $(this).addClass('hidden-image')
                                        .removeClass('further-image-before')
                                        .removeAttr('style');
                            });
                    break;
//                case (length - 2):
//                    if (current == length) {
//                        moveTo(1);
//                    } else {
//                        moveTo(length);
//                    }
//                    $(tagName + '[data-number="' + slide + '"').delay(scrollSpeed).queue(function () {
//                        moveTo(slide);
//                        $(this).dequeue();
//                    });
//                    break;
//                case -2:
//                    moveTo(slide - 1);
//                    $(tagName + '[data-number="' + slide + '"').delay(scrollSpeed).queue(function () {
//                        moveTo(slide);
//                        $(this).dequeue();
//                    });
//                    break;
//                case -(length - 2):
//                    if (slide - (-1) > length) {
//                        moveTo(1);
//                    } else {
//                        moveTo(slide - (-1));
//                    }
//                    $(tagName + '[data-number="' + slide + '"').delay(scrollSpeed).queue(function () {
//                        moveTo(slide);
//                        $(this).dequeue();
//                    });
//                    break;
//                case 2:
//                    moveTo(slide - (-1));
//                    $(tagName + '[data-number="' + slide + '"').delay(scrollSpeed).queue(function () {
//                        moveTo(slide);
//                        $(this).dequeue();
//                    });
//                    break;
            }

        }

        $(this).children().first().before($(this).children().last());
        $(this).children().first().before($(this).children().last());
    };

})(jQuery);
