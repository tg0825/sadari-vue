function Clock(elm) {
    this.elm = document.querySelector(elm) || '';
    this.week = ['일', '월', '화', '수', '아직 목', '불금', '토'];

    this.run = function() {
        function start() {
            var date = new Date();
            var today = date.getDay();
            var yyyymmdd =
                '<span class="date">' +
                date.getFullYear() +
                '년' +
                ('0' + (date.getMonth() + 1)).slice(-2) +
                '월' +
                ('0' + date.getDate()).slice(-2) +
                '일' +
                ' (' +
                this.week[today] +
                ')</span>' +
                '<span class="time">' +
                ('0' + date.getHours()).slice(-2) +
                '시' +
                ('0' + date.getMinutes()).slice(-2) +
                '분' +
                '</span>';

            this.elm.innerHTML = yyyymmdd;
        }
        start.call(this);
        setInterval(start.bind(this), 1000);
    };
}

var clock = new Clock('.clock');

clock.run();
