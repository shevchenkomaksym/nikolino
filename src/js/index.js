import '../scss/main.scss';
import '../img/logo-h.svg';
import '../img/map-logo.svg';
import '../img/map-01.svg';
import '../img/map-02.svg';
import '../img/map-03.svg';
import '../img/map-04.svg';
import '../img/map-05.svg';
import '../img/map-06.svg';
import '../img/map-07.svg';
import data from './data.xml';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import 'slick-carousel';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'jquery-ui/ui/widgets/selectmenu';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/ui/widgets/accordion';
import 'jquery-ui/ui/widgets/checkboxradio';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/i18n/datepicker-ru';
import IMask from 'imask';

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

    /*const iframes = document.querySelectorAll('.video-preview');
    let observerFrame = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                let newFrame = document.createElement('iframe');
                let source = entry.target.getAttribute('data-src');

                newFrame.setAttribute('src', source);
                newFrame.setAttribute('allowfullscreen', '1');

                newFrame.onload = function() {
                    entry.target.remove();
                };

                entry.target.parentNode.appendChild(newFrame);
            }
        });
    });
    if (iframes.length > 0) {
        iframes.forEach(function (frame) {
            observerFrame.observe(frame);
        });
    }*/

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
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    // about slider
    $('.about-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    // about reviews
    $('.about-review').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // about news
    $('.about-news__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // service slider
    $('.service-village__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000
    });

    // about house sliders
    $('.about-house__facade, .about-house__layout').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
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
    // tabs vertical
    $('.vertical-tabs').tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $('.vertical-tabs').removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

    // Accordion
    $('.tabs-accordion').accordion();

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

                let a = +rvWidth / 2;
                let b = +srPosition[0];
                let sliderWidthVal = +sliderWidth[0];
                let posValue = (b + a) - sliderWidthVal;

                $(this).find('.calculate__range-value').val(ui.value);

                if (a >= b) {
                    rangeValue.css({
                        left: a + 'px',
                    });
                }
                else if ((a + b) < sliderWidthVal) {
                    rangeValue.css({
                        left: rvPosition,
                        transform: 'translateX(-50%)',
                    });
                }
                else {
                    rangeValue.css('left', 'calc(100% - ' + a + 'px)');
                }
            },
            change: function (event, ui) {
                let rangeValue = $(this).find('.calculate__range-wrap');
                let rvWidth = rangeValue[0].offsetWidth;
                let sliderRange = $(this).find('.ui-slider-range');

                let srPosition = /\d+/.exec(sliderRange.css('width'));
                let sliderWidth = /\d+/.exec($(this).css('width'));
                let rvPosition = Math.round(Number(srPosition[0]) * 100 / Number(sliderWidth[0])) + '%';

                let a = +rvWidth / 2;
                let b = +srPosition[0];
                let sliderWidthVal = +sliderWidth[0];
                let posValue = (b + a) - sliderWidthVal;

                $(this).find('.calculate__range-value').val(ui.value);

                if (a >= b) {
                    rangeValue.css({
                        left: a + 'px',
                    });
                }
                else if ((a + b) < sliderWidthVal) {
                    rangeValue.css({
                        left: rvPosition,
                        transform: 'translateX(-50%)',
                    });
                }
                else {
                    rangeValue.css('left', 'calc(100% - ' + a + 'px)');
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

        let placeholder = '+7(';
        e.onfocus = function () {
            if (this.value === placeholder || this.value === '') {
                this.value = placeholder
            }
        };
        e.onblur = function () {
            if (this.value === placeholder) {
                this.value = ''
            }
        };
    });

    // Sliders switch
    $('.about-house__switch').on('click', '.about-house__switch-button', function () {
        let indexCurrent = $(this).index();
        let indexOff = indexCurrent > 0 ? indexCurrent - 1 : indexCurrent + 1;
        let sliders = $('.about-house-sliders .slick-slider');

        if (!$(this).hasClass('active')) {
            $('.about-house__switch-button.active').removeClass('active');
            $(this).addClass('active');
            sliders.eq(indexOff).addClass('position-absolute').fadeOut();
            sliders.eq(indexCurrent).removeClass('position-absolute').fadeIn().slick('slickGoTo', 0);
        } else {
            return false;
        }
    });

    $('.about-house__switch-button').each(function (i, e) {
        if ($(e).hasClass('active')) $('.about-house-sliders .slick-slider').eq(i).addClass('position-absolute').hide();
    });
});

if ($('#map').length) {
    $('#map').children('picture').remove();
    ymaps.load().then(maps => {
        const map = new maps.Map('map', {
            center: [45.101284, 39.056416],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        });

        map.behaviors.disable('scrollZoom');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) map.behaviors.disable('drag');

        const myPlacemark = new ymaps.Placemark(map.getCenter(), {
            hintContent: 'Николино Парк — экопоселок в Краснодаре',
            balloonContent: 'Николино Парк'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-logo.svg',
            iconImageSize: [86, 69],
            iconImageOffset: [-43, -34]
        });

        const placemarket1 = new ymaps.Placemark([45.035470, 38.975313], {
            hintContent: 'Краснодар'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-01.svg',
            iconImageSize: [92, 32],
            iconImageOffset: [-46, -16]
        });
        const placemarket2 = new ymaps.Placemark([45.093275, 38.981266], {
            hintContent: 'Спорт и отдых'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-02.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });
        const placemarket3 = new ymaps.Placemark([45.031720, 39.046046], {
            hintContent: 'Магазины и ТЦ'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-03.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });
        const placemarket4 = new ymaps.Placemark([45.088725, 39.121138], {
            hintContent: 'Медицинские учреждения'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-04.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });
        const placemarket5 = new ymaps.Placemark([45.034333, 39.138979], {
            hintContent: 'Аэропорт'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-05.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });
        const placemarket6 = new ymaps.Placemark([45.074286, 39.193945], {
            hintContent: 'Школы и десткие сады'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-06.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });
        const placemarket7 = new ymaps.Placemark([45.052368, 39.017724], {
            hintContent: 'Рестораны и кафе'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-07.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });


        map.geoObjects
            .add(myPlacemark)
            .add(placemarket1)
            .add(placemarket2)
            .add(placemarket3)
            .add(placemarket4)
            .add(placemarket4)
            .add(placemarket5)
            .add(placemarket5)
            .add(placemarket6)
            .add(placemarket7);
    }).catch(error => console.log('Failed to load Yandex Maps', error));
}


// ymaps.ready(init);
/*
function init() {
        // Создание экземпляра карты.
        var myMap = new ymaps.Map('map', {
            center: [50.443705, 30.530946],
            zoom: 12,
            controls: []
        });

        // Загрузка YMapsML-файла.
        ymaps.geoXml.load('data.xml').then(function (res) {
                    res.geoObjects.each(function (item) {
                        addMenuItem(item, myMap);
                    });
                },
                // Вызывается в случае неудачной загрузки YMapsML-файла.
                function (error) {
                    alert("При загрузке YMapsML-файла произошла ошибка: " + error);
                });

        // Добавление элемента в список.
        function addMenuItem(group, map) {
            // Показать/скрыть группу геообъектов на карте.
            $("<a class=\"title\" href=\"#\">" + group.properties.get('name') + "</a>")
                .bind("click", function () {
                    let link = $(this);
                    // Если пункт меню "неактивный", то добавляем группу на карту,
                    // иначе - удаляем с карты.
                    if (link.hasClass("active")) {
                        map.geoObjects.remove(group);
                    } else {
                        map.geoObjects.add(group);
                    }
                    // Меняем "активность" пункта меню.
                    link.toggleClass("active");
                    return false;
                })
                // Добавление нового пункта меню в список.
                .appendTo(
                    $("<li></li>").appendTo($("#menu"))
                );
        }
    }
}*/