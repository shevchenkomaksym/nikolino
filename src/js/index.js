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
import '../../node_modules/jquery-ui/ui/widgets/slider';
import '../../node_modules/jquery-ui/ui/widgets/checkboxradio';
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
    $('.main-wrapper').css('padding-top', h.height());
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

    // button scroll to top
    const scrollTop = $('.scroll-top');
    scrollTop.click(function () {
        $('html, body').animate({
            scrollTop: 0,
        }, 750);

        return false;
    });

    $(window).on('scroll', function (e) {
        let yOffset = window.pageYOffset;
        let header = $('header.header');

        if (yOffset > 0) {
            header.addClass('bg-light');
            header.find('.row').removeClass('py-lg-4');
            header.find('.row').addClass('py-lg-2');
            $('.logo img').attr('src', '../img/logo-h.svg');
            $('.callback-header__number').removeClass('mb-lg-3');
            $('.callback-header__modal-btn').removeClass('d-inline-block');
            $('.callback-header__modal-btn').addClass('d-none');
        }
        else {
            header.removeClass('bg-light');
            header.find('.row').removeClass('py-lg-2');
            header.find('.row').addClass('py-lg-4');
            $('.logo img').attr('src', '../img/logo.svg');
            $('.callback-header__number').addClass('mb-lg-3');
            $('.callback-header__modal-btn').removeClass('d-none');
            $('.callback-header__modal-btn').addClass('d-inline-block');
        }

        if (yOffset >= 800) scrollTop.addClass('active'); else scrollTop.removeClass('active');
    });
});

$(function () {
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
    $('.calculate__range').slider({
        range: 'min'
    });

    $( "input[type='radio']" ).checkboxradio();

    // form switch
    $('.callback__form-switch').on('click', function () {
        $(this).toggleClass('on');
        $(this).next().toggleClass('hide', 'show');
    });

    // input mask
    let element = document.querySelectorAll('.mask-phone');
    element.forEach(function (e) {
        let mask = IMask(e, {
            mask: '{+7}(000)000-00-00'
        });
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
});