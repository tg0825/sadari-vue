import axios from 'axios';

export default {
    getMember: payload => axios.get('/member').then(res => res.data)
}
