require('../blocks/mdlComponentHandler/mdlComponentHandler.js');
require('../blocks/mdl-icon-toggle/mdl-icon-toggle');
require('../blocks/uk-core/uk-core.js');
require('../blocks/uk-modal/uk-modal.js');
require('../blocks/uk-sticky/uk-sticky.js');
require('../blocks/util/util.js');
require('../blocks/collapse/collapse.js');
require('../blocks/treeview/treeview.js');
require('../blocks/bootstrap-filestyle/bootstrap-filestyle.js');

$(() => {
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
});
