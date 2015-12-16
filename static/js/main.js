$(document).ready(function () {
    $('.element-title').html($('.menu-carousel').children().first().attr('data-title'));
    $('.element-title').attr('data-url', $('.menu-carousel').children().first().attr('data-url'));

    $('.menu-carousel').menuCarousel({
        scrollSpeed: 800,
        widthForThree: '768',
        widthForOne: '480',
        moveLeft: '.move-left',
        moveRight: '.move-right',
        animationCallback: function (element) {
            $('.element-title').html($(element).attr('data-title'));
            $('.element-title').attr('data-url', $(element).attr('data-url'));
        }
    });

    $('.menu-carousel .front-image, .element-title').on({
        click: function () {
            if ($(this).attr('data-url')) {
                window.location = $(this).attr('data-url');
            }
        }
    });
});
