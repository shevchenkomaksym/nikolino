import '../scss/main.scss';
import '../img/logo-h.svg';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import 'slick-carousel';
import 'nouislider';
import IMask from 'imask';
import 'jquery-ui';
import '../../node_modules/jquery-ui/ui/widgets/tabs';
import '../../node_modules/jquery-ui/ui/widgets/selectmenu';
import '../../node_modules/jquery-ui/ui/widgets/slider';
import '../../node_modules/jquery-ui/ui/widgets/checkboxradio';
import '../../node_modules/jquery-ui/ui/widgets/datepicker';
import '../../node_modules/jquery-ui/ui/i18n/datepicker-ru';
import '../../node_modules/jquery-ui/ui/effect';
// import '../../node_modules/jquery-ui/themes/base/images/ui-bg_flat_0_aaaaaa_40x100.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_444444_256x240.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_555555_256x240.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_777620_256x240.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_777777_256x240.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_cc0000_256x240.png';
// import '../../node_modules/jquery-ui/themes/base/images/ui-icons_ffffff_256x240.png';

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

    let h = $('header.header');
    $('.main-wrapper').css('padding-top', h.outerHeight());
});

$(function () {
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }

    // Scroll to up
    const scrollTop = $('.scroll-top');
    scrollTop.click(function () {
        $('html, body').animate({
            scrollTop: 0,
        }, 750);

        return false;
    });

    // Scroll event
    $(window).on('scroll', function () {
        let yOffset = window.pageYOffset;
        let header = $('header.header');
        if (yOffset > 0) {
            header.addClass('bg-light');
            header.find('.row').removeClass('py-lg-4');
            header.find('.row').addClass('py-lg-2');
            $('.logo img').attr('src', '../img/logo-h.svg');
        }
        else {
            header.removeClass('bg-light');
            header.find('.row').removeClass('py-lg-2');
            header.find('.row').addClass('py-lg-4');
            $('.logo img').attr('src', '../img/logo.svg');
        }

        if (yOffset >= 800) scrollTop.addClass('active'); else scrollTop.removeClass('active');
    });

    $(window).on('load scroll', function () {
        if ($(window).width() < 1080) {
            $('.logo img').attr('src', '../img/logo.svg');
        }
    });
});

$(function () {
    // main slider
    $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    // about slider
    $('.about-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    // about reviews
    $('.about-review').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // about news
    $('.about-news__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // service slider
    $('.service-village__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,
        // autoplay: true,
        // autoplaySpeed: 5000
    });

    $(window).on('load resize', function () {
        if ($(window).width() < 1080) {
            if ($('.mobile-slider.slick-slider').length === 0) {
                $('.mobile-slider').slick({
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    arrows: false,
                    dots: true
                });
            }

            $('.employe-slider').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                dots: true,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }]
            });
        }
        else if ($(window).width() >= 1080) {
            if ($('.mobile-slider.slick-slider').length) {
                $('.mobile-slider').slick('unslick');
            }
        }
    });
});

$(function () {
    // Menu button
    $('.burger-button').on('click', function () {
        $('body').toggleClass('overflow-hidden');
        $('header.header').toggleClass('menu-open');
        $(this).toggleClass('active');
        $(this).prev().toggleClass('active');
    });

    // Form switch
    $('.callback__form-switch').on('click', function () {
        $(this).toggleClass('on');
        $(this).next().toggleClass('hide', 'show');
    });

    // Tabs
    let mainTabs = $('#tabs');
    mainTabs.tabs({
        hide: {effect: "fadeOut", duration: 500},
        show: {effect: "fadeIn", duration: 500}
    });
    $('.tab-switch').on('click', function (e) {
        e.preventDefault();
        let val = $(this).attr('href');
        let tab = /\d+/.exec(val);
        let tabIndex = Number(tab[0]) - 1;

        console.log(tabIndex);
        mainTabs.tabs("option", "active", tabIndex);
    });

    // Slider price
    let rangeSlider = document.querySelectorAll('.calculate__range');
    $.each(rangeSlider, function (index, elem) {
        $(elem).slider({
            range: 'min',
            min: $(this).data('min'),
            max: $(this).data('max'),
            value: Math.round(Number($(this).data('max')) / 2),
            slide: function (event, ui) {
                let rangeValue = $(this).find('.calculate__range-wrap');
                let rvWidth = rangeValue[0].offsetWidth;
                let sliderRange = $(this).find('.ui-slider-range');

                let srPosition = /\d+/.exec(sliderRange.css('width'));
                let sliderWidth = /\d+/.exec($(this).css('width'));
                let rvPosition = Math.round(Number(srPosition[0]) * 100 / Number(sliderWidth[0])) + '%';

                let a = +rvWidth/2;
                let b = +srPosition[0];
                let sliderWidthVal = +sliderWidth[0];
                let posValue = (b + a) - sliderWidthVal;

                $(this).find('.calculate__range-value').val(ui.value);

                if (a >= b) {
                    rangeValue.css({
                        left: a+'px',
                    });
                }
                else if ((a+b) < sliderWidthVal) {
                    rangeValue.css({
                        left: rvPosition,
                        transform: 'translateX(-50%)',
                    });
                }
                else {
                    rangeValue.css('left', 'calc(100% - '+ a +'px)');
                }
            },
            change: function (event, ui) {
                let rangeValue = $(this).find('.calculate__range-wrap');
                let rvWidth = rangeValue[0].offsetWidth;
                let sliderRange = $(this).find('.ui-slider-range');

                let srPosition = /\d+/.exec(sliderRange.css('width'));
                let sliderWidth = /\d+/.exec($(this).css('width'));
                let rvPosition = Math.round(Number(srPosition[0]) * 100 / Number(sliderWidth[0])) + '%';

                let a = +rvWidth/2;
                let b = +srPosition[0];
                let sliderWidthVal = +sliderWidth[0];
                let posValue = (b + a) - sliderWidthVal;

                $(this).find('.calculate__range-value').val(ui.value);

                if (a >= b) {
                    rangeValue.css({
                        left: a+'px',
                    });
                }
                else if ((a+b) < sliderWidthVal) {
                    rangeValue.css({
                        left: rvPosition,
                        transform: 'translateX(-50%)',
                    });
                }
                else {
                    rangeValue.css('left', 'calc(100% - '+ a +'px)');
                }
            }
        });

        let sliderRange = $(elem).find('.ui-slider-range');
        let srLeft = sliderRange.offsetLeft;
        let srWidth = sliderRange.offsetWidth;
        let srRight = srLeft + srWidth;

        let rangeValue = $(elem).find('.calculate__range-wrap');
        let rvLeft = rangeValue.offsetLeft;
        let rvWidth = rangeValue.offsetWidth;
        let rvRight = rvLeft + rvWidth;

        let rangePos = /\d+/.exec(sliderRange.css('width'));

        $(elem).find('.calculate__range-value').val($(elem).slider('option', 'value'));

        if (rvLeft <= srLeft) {
            rangeValue.css('left', '0%');
        }
        else if (rvRight >= srRight) {
            rangeValue.css('left', 'auto');
        }
        else {
            rangeValue.css({
                left: rangePos.input,
            });
        }
    });
    $('.calculate__range-value').on('change /*keydown keyup*/', function () {
        $(this).closest('.calculate__range').slider('option', 'value', $(this).val());
    });

    // Radio-box
    $("input[type='radio']").checkboxradio();

    // Input date
    $('input.datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        minDate: new Date(),
        showAnim: 'slideDown'
    });

    // Input select
    $('select.input-select').selectmenu();

    // Input mask
    let element = document.querySelectorAll('.mask-phone');
    element.forEach(function (e) {
        let mask = IMask(e, {
            mask: '{+7}(000)000-00-00'
        });
    });
});