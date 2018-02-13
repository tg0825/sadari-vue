/**
 * modal
 * @param {[type]} window [description]
 * @param {[type]} document [description]
 * @param {[type]} $ [description]
 * @param {[type]} JQ [description]
 * @return {[type]} [description]
 */
var modal = (function (window, document, $, JQ) {
    var $modal = $('<div class="modal"></div>');
    var $modalMask = $('<div class="modal-mask"></div>');
    var $modalBox = $('<div class="modal-box"></div>');
    var optionNumber = '<div class="option root">' +
        '<label class="option item">' +
        '<input type="checkbox" data-option="number">' +
        ' 번호 표시 </label>' +
        '</div>';

    $modal.append($modalMask, $modalBox);

    function open(content) {
        close();
        $modalBox.html(content + optionNumber);
        $modal.appendTo(JQ.BODY);
    }

    function close() {
        $modal.attr('data-option','').remove();
    }

    JQ.DOC.on('click', '.modal-mask', close);

    return {
        open: open,
        close: close
    }
}(window, document, jQuery, JQ));
