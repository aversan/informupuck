require('../blocks/mdlComponentHandler/mdlComponentHandler.js');
require('../blocks/mdl-icon-toggle/mdl-icon-toggle');
require('../blocks/uk-core/uk-core.js');
require('../blocks/uk-modal/uk-modal.js');
require('../blocks/uk-sticky/uk-sticky.js');
require('../blocks/uk-nav/uk-nav.js');
require('../blocks/uk-switcher/uk-switcher.js');
require('../blocks/uk-offcanvas/uk-offcanvas.js');
require('../blocks/uk-dropdown/uk-dropdown.js');
require('../blocks/nanoscroller/nanoscroller.js');
require('../blocks/uk-grid/uk-grid.js');
require('../blocks/util/util.js');
require('../blocks/collapse/collapse.js');
require('../blocks/treeview/treeview.js');

import nouislider from '../blocks/nouislider/nouislider.js';
import swiper from '../blocks/swiper/swiper.js';

$(() => {

    // Panel collapse

    $('.panel .collapse-toggle').on('click', function() {
        var target = $(this).data('target');
        var $primaryTarget = $(this).parents('.panel').find(target);

        if ($primaryTarget.hasClass('in')) {
            $(target).collapse('hide');
        } else {
            $(target).collapse('show');
            ininGoogleMapInDetailCompany();
        }
    });


   // Page right

   $('.page-right__toggle-icon').on('click', function(){
        var $parent = $(this).parents('.page-right:first');

        if ($parent.hasClass('is-visible')) {
            $parent.removeClass('is-visible');
        } else {
            $parent.addClass('is-visible');
        }
    });

    $('.page-right__tint').on('click', function(){
        $(this).siblings('.page-right').removeClass('is-visible');
    });


   // Page side

   $('.page-side__toggle-icon').on('click', function(){
        var $parent = $(this).parents('.page-side:first');

        if ($parent.hasClass('is-visible')) {
            $parent.removeClass('is-visible');
        } else {
            $parent.addClass('is-visible');
        }
    });

    $('.page-side__tint').on('click', function(){
        $(this).siblings('.page-side').removeClass('is-visible');
    });


    // Layout header

    $('.layout__header--main .input__container').each(function(){
        var container = $(this);
        var control = container.find('.form-control');

        control.focusin(function() {
            container.addClass('is-focused');
        });

        control.focusout(function() {
            container.removeClass('is-focused');
        });
    })

    $('.layout__header:not(.layout__header--main) .layout__header-button-menu').on('click', function(){
        var $toggle = $(this);
        var id = $toggle.data('target');
        var $target = $(id);
        var $body = $('body');

        function open() {
            $target.addClass('uk-active');
            $target.children('.uk-offcanvas-bar').addClass('uk-offcanvas-bar-show');
            $toggle.empty().html('<i class="mdi mdi-close"></i>').addClass('is-open');
            $body.addClass('uk-offcanvas-page');

            $target.on('click.menu', function(event) {
                if(!$(event.target).closest($target.children('.uk-offcanvas-bar')).length) {
                    close();
                }
            });
        }

        function close() {
            $target.removeClass('uk-active');
            $target.children('.uk-offcanvas-bar').removeClass('uk-offcanvas-bar-show');
            $toggle.empty().html('<i class="mdi mdi-menu"></i>').removeClass('is-open');
            $body.removeClass('uk-offcanvas-page');
            $target.off('click.menu');
        }

        if ($target.hasClass('uk-active')) {
            close();
        } else {
            open();
        }
    });


    // Swiper main

    var swiperSlideMain = swiper('.swiper-container--slide-main', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0
    });


    // Nano Scroller

    $(".nano").nanoScroller();

    if( 'ontouchstart' in window ){ var click = 'touchstart'; }
    else { var click = 'click'; }

    // js-tab

    $('.js-tab-toggle').on('click', function(event){
        var id = $(this).attr('href');
        $(id).siblings().removeClass('is-active').end().addClass('is-active');

        return false;
    });
});
