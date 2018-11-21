/**
 * 로컬스토리지 입출력 함수
 * @constructor
 */
function Storage() {
    this.getItem = function (name) {
        try {
            return JSON.parse(window.localStorage.getItem(name));
        } catch (e) {
            alert('error');
            return;
        }
    }
    this.setItem = function (name, value) {
        try {
            window.localStorage.setItem(name, JSON.stringify(value));
        } catch (e) {
            alert('error');
            return;
        }
    }
}