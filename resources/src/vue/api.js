import axios from 'axios';

export default {
    // 직원 리스트 가져오기
    getMemberList: payload => axios.get('/member').then(res => res.data)
}
