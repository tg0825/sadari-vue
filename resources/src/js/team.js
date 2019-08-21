function Team() {
    this.$ui = $('body');
    this.$itemList = null;

    this.apiDelete = '/admin/team/delete';

    this._init();
}

Team.prototype = {
    delete: function (index) {
        var $selectedItem = this.$itemList.eq(index);
        var param = {
            team_id: $selectedItem.attr('data-team-id')
        };

        $.post(this.apiDelete, param)
            .done(function () {
                $selectedItem.remove();
            });
    },
    _updateData: function () {
        this.$itemList = this.$ui.find('.team-item');
    },
    _handleClickDelete: function (e) {
        var index = $(e.currentTarget).parents('.team-item').index();
        if (!confirm('팀을 삭제하시겠습니까?')) return false;
        this.delete(index);
    },
    _bindEvent: function () {
        this.$ui.on('click', '[data-team-btn="delete"]', this._handleClickDelete.bind(this));
    },
    _init: function () {
        this._bindEvent();
        this._updateData();
    }
}
