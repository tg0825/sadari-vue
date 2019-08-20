import axios from 'axios';
const store = {
    debug: true,
    state: {
        message: 'Hello!',
        // 직원 리스트
        member: []
    },
    setMessageAction (newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue);
        this.state.message = newValue;
    },
    clearMessageAction () {
        if (this.debug) console.log('clearMessageAction triggered');
        this.state.message = '';
    },
    getMember() {
        return axios.get('/member');
    }
}

export default store;