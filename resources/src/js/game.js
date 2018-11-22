function RandomGame() {
    // 구성원
    this.member_list = null;
    
    // 조 수 (카드 수)
    this.group_list = null;
    
    // dom game button box
    this.$game = $('.sadari-select');
}

RandomGame.prototype = {
    _typeRandomLunch: function () {
        
    },
    _getGameType: function () {
        
    },
    _setGameType: function () {
        
    },
    _startGame: function () {
        _typeRandomLunch();
    },
    _handleClickStart: function () {
        this._startGame();
    },
    _bindEvent: function () {
        this.$game.on('click', _handleClickStart.bind(this));
    },
    _init: function () {
        this._bindEvent();
    }
}