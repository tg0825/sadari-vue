// pubsub
var store = {
    events: {},
    on: function (evt, fn) {
        this.events[evt] = this.events[evt] || [];
        this.events[evt].push(fn);
        
        return this;
    },
    offForceArray: function (eventArray) {
        var self = this;

        try {
            if (!Array.isArray(eventArray)) throw new Error('배열을 입력해주세요.');
            eventArray.forEach(function (evt, i) {
                if (self.events.hasOwnProperty(evt)) {
                    delete self.events[evt];
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    off: function (evt, fn) {
        if (this.events[evt]) {
            var i = 0;
            for (; i < this.events[evt].length; i++) {
                if (this.events[evt][i] === fn) {
                    this.events[evt].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (evt, data) {
        var obj = [];
        if (this.events[evt]) {
            this.events[evt].forEach(function (fn) {
                obj.push(fn(data));
            });
        }
        return obj;
    }
};
