const $ = require('./jquery-2.1.4.min')

const checkbox = $('details_block');
const detailsBlock = $('#details_block');
const nameSelector = $('#name');
const secondName = $('#second_name');
const bodySelector = $('body');
const successHolder = $('.successHolder');
const detailsInput = $('.details');
const SubmitButton = $('.SubmitButton');
const closeBtn = $('.closeButton');


checkbox.checked = false;


init();

/**
 * init function add clicks
 * @type: function
 */
function init() {
    SubmitButton.click(e => {

        e.preventDefault();

        if (nameSelector.val().length >= 3 && secondName.val().length >= 3) {
            successHolder.show();
            bodySelector.find('.successHolder > span').html($('#name').val() + ',<br>');

            initializeClose_button();

        }
    });
    detailsBlock.on('click', is_checkbox_clicked);
}




/**
 * check property of checkbox
 *   @type: function

 */
function is_checkbox_clicked() {
    if (detailsBlock.is(':checked')) {
        open_details();
    } else {
        hide_Details();
    }
}

/**
 * get display none to details input
 * @type: function

 */
function hide_Details() {
    detailsInput.hide();
}
/**
 * get display block to details input
 * @type: function

 */
function open_details() {
    detailsInput.show();
    console.log(detailsInput.attr('style'));
}

/**
 * initializing close button
 * @type: function
 */
function initializeClose_button() {
    closeBtn.click(function () {
        successHolder.hide();
    });
}
module.exports = {
    init,
    initializeClose_button,
    hide_Details,
    open_details,
    is_checkbox_clicked
};


