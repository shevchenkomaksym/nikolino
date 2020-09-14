import '../scss/main.scss';
import '../img/map-logo.svg';
import '../img/map-01.svg';
import '../img/map-02.svg';
import '../img/map-03.svg';
import '../img/map-04.svg';
import '../img/map-05.svg';
import '../img/map-06.svg';
import '../img/map-07.svg';
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
import 'lightgallery';
import 'lg-thumbnail';

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

    $('.plan-svg-map svg path').each(function(){
        $(this).on('click', function(){
            console.log('active path');
            $(this).addClass('active');
            $(this).parent().siblings().find('path').removeClass('active');
        })
    })
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
    $(window).on('load scroll', function () {
        let yOffset = window.pageYOffset;
        let header = $('header.header');
        let logo = $('.logo');
        let logoImg = logo.find('img');
        let logoMain = logo.data('src');
        let logoMin = logo.data('logo');

        if (yOffset > 0) {
            header.addClass('bg-light');
            header.find('.row').removeClass('py-lg-4');
            header.find('.row').addClass('py-lg-2');
            logoImg.attr('src', logoMin);
        }
        else {
            header.removeClass('bg-light');
            header.find('.row').removeClass('py-lg-2');
            header.find('.row').addClass('py-lg-4');
            logoImg.attr('src', logoMain);
        }

        if ($(window).width() < 1080) {
            logoImg.attr('src', logoMain);
        }

        yOffset >= 800 ? scrollTop.addClass('active') : scrollTop.removeClass('active');
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
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: false
            }
        }]
    });

    // about reviews
    $('.about-review').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    // about news
    $('.about-news__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    // service slider
    /*$('.service-village__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000
    });*/

    // about house sliders
    $('.about-house__facade, .about-house__layout').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: true,
    });

    // rest slider
    $('.rest-tabs__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
    });

    // park slider
    $('.park__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
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
        show: {effect: "fadeIn", duration: 500},
    });
    $('.tab-switch').on('click', function (e) {
        e.preventDefault();
        let val = $(this).attr('href');
        let tab = /\d+/.exec(val);
        let tabIndex = Number(tab[0]) - 1;

        mainTabs.tabs("option", "active", tabIndex);
    });
    // tabs vertical
    $('.vertical-tabs').tabs({
        hide: {effect: "fadeOut", duration: 500},
        show: {effect: "fadeIn", duration: 500},
    })
        .addClass("ui-tabs-vertical ui-helper-clearfix ui-corner-left")
        .removeClass("ui-corner-top");

    $('.rest-tabs').tabs({
        hide: {effect: "fadeOut", duration: 500},
        show: {effect: "fadeIn", duration: 500},
        activate: function (e, ui) {
            $(ui.newPanel).find('.rest-tabs__slider').slick('slickGoTo', 0)
        }
    });

    // Accordion
    $('.tabs-accordion').accordion({
        heightStyle: "content"
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
    let datepicker = $('input.datepicker')
    datepicker.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        minDate: new Date(),
        showAnim: 'slideDown'
    });
    datepicker.on('keydown keypress paste', function (e) {
        e.preventDefault();
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
            $('.about-house__switch-button').eq(indexOff).removeClass('active');
            $(this).addClass('active');
            sliders.eq(indexOff).addClass('position-absolute').fadeOut();
            sliders.eq(indexCurrent).removeClass('position-absolute').fadeIn().slick('slickGoTo', 0);
        } else {
            return false;
        }
    });

    $('.about-house__switch-button').each(function (i, e) {
        if (!$(e).hasClass('active')) {
            $('.about-house-sliders .slick-slider').eq(i).addClass('position-absolute').fadeOut();
        }
    });

    // Plans switch
    $('.plans__btn-wrap').on('mouseenter mouseleave', '.plans__button', function () {
        let index = Number($(this).data('index'));
        $('.plans__images-wrap picture').eq(index).toggleClass('hide');
    });

    // Lightgallery
    $('#gallery').lightGallery({
        download: false,
        thumbnail: true,
        showThumbByDefault: true
    });
});

const center = [45.100975, 39.056494];
const groups = [
    {
        name: 'Магазины и ТЦ',
        opt: {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-03.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        },
        items: [
            {
                coordinates: [45.031720, 39.046046],
                name: 'ТЦ Галактика'
            },
            {
                coordinates: [45.093500, 39.002989],
                name: 'ТЦ Стрелка'
            },
            {
                coordinates: [45.109938, 39.018127],
                name: 'ТЦ Максимус'
            }
        ]
    },
    {
        name: 'Школы и десткие сады',
        opt: {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-06.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        },
        items: [
            {
                coordinates: [45.095106, 39.109580],
                name: 'Детский сад № 43'
            },
            {
                coordinates: [45.108424, 39.015004],
                name: 'Детский сад № 85 Березка'
            },
            {
                coordinates: [45.083345, 39.096233],
                name: 'Детский сад Дивный'
            }
        ]
    },
    {
        name: 'Медицинские учреждения',
        opt: {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-04.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        },
        items: [
            {
                coordinates: [45.088725, 39.121138],
                name: 'Медцентр'
            },
            {
                coordinates: [45.093932, 39.011621],
                name: 'Медсонар'
            }
        ]
    },
    {
        name: 'Спорт и отдых',
        opt: {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-02.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        },
        items: [
            {
                coordinates: [45.050640, 39.124498],
                name: 'Знаменский'
            },
            {
                coordinates: [45.102356, 38.989356],
                name: 'TopKart'
            },
            {
                coordinates: [45.116345, 38.978253],
                name: 'Город спорта'
            }
        ]
    },
    {
        name: 'Рестораны и кафе',
        opt: {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-07.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        },
        items: [
            {
                coordinates: [45.114528, 39.043257],
                name: 'Вода&Еда'
            },
            {
                coordinates: [45.072459, 39.039300],
                name: 'Додо Пицца'
            },
            {
                coordinates: [45.094003, 39.005165],
                name: 'KFC'
            }
        ]
    }
];
//************* maps **************
if ($('#map').length) {
    $('#map').children('picture').remove();
    ymaps.load().then(maps => {
        const myMap = new maps.Map('map', {
            center: center,
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        });

        myMap.behaviors.disable('scrollZoom');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            myMap.behaviors.disable('drag');
        }

        // Контейнер для меню.
        const menu = $('.map-switcher');

        // Обязательные элементы
        const myPlacemark = new ymaps.Placemark(center, {
            hintContent: 'Николино Парк',
            balloonContent: 'Николино Парк — экопоселок в Краснодаре'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-logo.svg',
            iconImageSize: [86, 69],
            iconImageOffset: [-43, -34]
        });
        const city = new ymaps.Placemark([45.035470, 38.975313], {
            hintContent: 'Краснодар'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-01.svg',
            iconImageSize: [92, 32],
            iconImageOffset: [-46, -16]
        });
        const airport = new ymaps.Placemark([45.033925, 39.139669], {
            hintContent: 'Международный аэропорт Краснодар имени Екатерины II'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-05.svg',
            iconImageSize: [46, 46],
            iconImageOffset: [-23, -23]
        });

        function createMenuGroup(group) {
            // Пункт меню.
            const menuItem = $('<li><button type="button" class="map-switcher__button">' + group.name + '</button></li>');
            // Коллекция для геообъектов группы.
            const collection = new ymaps.GeoObjectCollection(null, group.opt);
            // Добавляем коллекцию на карту.
            /*myMap.geoObjects.add(collection);*/
            // Добавляем пункт в меню.
            menuItem.appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
                .find('button')
                .bind('click', function () {
                    $(this).toggleClass('active');
                    if (collection.getParent()) {
                        myMap.geoObjects.remove(collection);
                    } else {
                        myMap.geoObjects.add(collection);
                    }
                    // Выставляем масштаб карты чтобы были видны все группы.
                    myMap.setBounds(myMap.geoObjects.getBounds());
                });

            for (let j = 0, m = group.items.length; j < m; j++) {
                createSubMenu(group.opt, group.items[j], collection);
            }
        }

        function createSubMenu(option, item, collection) {
            // Создаем метку.
            const placemark = new ymaps.Placemark(item.coordinates, {hintContent: item.name}, option);

            // Добавляем метку в коллекцию.
            collection.add(placemark);
        }

        for (let i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }

        // Добавим обязательные элементы
        myMap.geoObjects
            .add(myPlacemark)
            .add(city)
            .add(airport);


    }).catch(error => console.log('Failed to load Yandex Maps', error));
}
else if ($('#map-contact').length) {
    $('#map-contact').children('picture').remove();

    ymaps.load().then(maps => {
        const contactMap = new maps.Map('map-contact', {
            center: center,
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            contactMap.behaviors.disable('drag');
        }
        else {
            contactMap.behaviors.disable('scrollZoom');
        }

        const myPlacemark = new ymaps.Placemark(contactMap.getCenter(), {
            hintContent: 'Николино Парк'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './../img/map-logo.svg',
            iconImageSize: [86, 69],
            iconImageOffset: [-43, -34]
        });

        contactMap.geoObjects.add(myPlacemark);

    }).catch(error => console.log('Failed to load Yandex Maps', error));
}
//*********************************