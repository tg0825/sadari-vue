$(function () {
    // ajax search
    (function () {
        var $searchForm = $('[name="search"]');
        var $tableTbody = $('#member_list tbody');
        var $row = $('<tr><td colspan="3" class="ta-c"></td></tr>').find('td');
        var emptyMessage = '결과가 없습니다.';
        var loadingMessage = '로딩중..';

        function MustacheRedner(tmplName, data) {
            var template = $(tmplName).html();
            Mustache.parse(template);
            var render = Mustache.render(template, {data: data});
            return render;
        }

        function handleSearch(e) {
            try {
                var eTarget = e.currentTarget;
                var api = eTarget.dataset.api;
                var value = $.trim(eTarget.value);
                var param = {
                    sw: value
                };

                if (!value) return;
                $tableTbody.html($row.html(loadingMessage));

                $.getJSON(api, param)
                    .done(function (response) {
                        var result;
                        if (response.length) result = MustacheRedner('#member_list_mustache', response);
                        else result = $row.html(emptyMessage);
                        $tableTbody.html(result);
                    });
            } catch (e) {
                console.log(e);
            }
        }

        $searchForm.on('keyup', '[name="sw"]', handleSearch);
    }());
});
