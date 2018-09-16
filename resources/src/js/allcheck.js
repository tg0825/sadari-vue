// constructor
function AllCheck(option) {
    option = option || {};

    this.ui = option.ui || '.js-all-check';
    this.itemSelector = '.js-all-check-item';
    this.masterSelector = '.js-all-check-master';
    this.activeClass = option.activeClass || 'highlight';
    this.activeElement = option.activeElement || 'div';
    this.checkedItemList = [];

    this.$ui = $(this.ui);
    this.$item = this.$ui.find(this.itemSelector);
    this.$master = this.$ui.find(this.masterSelector);

    // 항목 전체 갯수
    this.totalCount = this.$item.length;
    // 채크된 항목 갯수
    this.activeCount = 0;
    // master 상태
    this.state = null;
    // activeClass 사용여부
    this.isActiveClass = option.isActiveClass || false;

    // init
    this.updateItemData();
    this.updateMasterCheck();
    this._bindEvent();
}

AllCheck.prototype = {
    updateMasterCheck: function () {
        var state = false;

        if (!this.isEmpty()
        && this.totalCount === this.activeCount
        ) {
            state = true;
        }

        this.$master.prop('checked', state);
    },
    isEmpty: function () {
        return this.$ui.find(this.itemSelector).length === 0;
    },
    changeStateFunc: function (type, state) {
        var isNotMaster;

        if (Array.isArray(state)) {
            state = state[0];
            isNotMaster = state[1];
        }

        if (typeof state === 'boolean' && state === false) {
            state = false;
        } else {
            state = true;
        }

        this.$item.prop(type, state)
        if (!isNotMaster) this.$master.prop('checked', state);
    },
    disableAllItem: function (state) {
        this.changeStateFunc('disabled', state);
    },
    checkAllItem: function (state) {
        this.changeStateFunc('checked', state);
        this._updateItemClass(this.$item, state);
    },
    updateItemData: function () {
        var count = 0;
        var self = this;
        this.checkedItemList = [];
        this.$item = this.$ui.find(this.itemSelector);
        this.totalCount = this.$item.length;

        if (!this.isEmpty()) {
            this.$item.each(function () {
                if (this.checked) {
                    self.checkedItemList.push(this);
                    count += 1;
                }
            });
        }

        this.activeCount = count;
    },
    _updateItemClass: function ($elm, state) {
        $elm = $elm || this.$item;

        if (Array.isArray(state)) state = state[0];

        if (this.isActiveClass) {
            $.each($elm, function (i, e) {
                var $elm = $(e).parents(this.activeElement);

                if (state) $elm.addClass(this.activeClass);
                else $elm.removeClass(this.activeClass);
            }.bind(this));
        }
    },
    _handleChangeItem: function (e) {
        var $eTarget = $(e.currentTarget);
        var state = $eTarget.prop('checked');
        this.updateItemData();
        this.updateMasterCheck();
        this._updateItemClass($eTarget, state);
    },
    _handleChangeMaster: function (e) {
        this.state = this.$master.prop('checked') || false;
        this.checkAllItem(this.state);
        this.updateItemData();

        this._updateItemClass(this.$item, this.state);
    },
    _bindEvent: function () {
        this.$ui
            .on('change', this.itemSelector, this._handleChangeItem.bind(this))
            .on('click', this.masterSelector, this._handleChangeMaster.bind(this));

        // events.on('updateMasterCheck', this.updateMasterCheck.bind(this));
        // events.on('checkAllItem', this.checkAllItem.bind(this));
        // events.on('disableAllItem', this.disableAllItem.bind(this));
        // events.on('updateItemData', this.updateItemData.bind(this));
    }
}
