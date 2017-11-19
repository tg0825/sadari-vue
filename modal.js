var modal = (function (window, document, $) {
    var $body = $('body');
    var modalhtml = '<div class="modal"></div>';

    function open(content) {
        close();
        $body.append(modalhtml);
        $('.modal').html(content);
    }

    function close() {
        $body.find('.modal').remove();
    }

    // $(document).on('click', close);
    $(document).on('click', '.modal', close);

    return {
        open: open,
        close: close
    }
}(window, document, jQuery));
