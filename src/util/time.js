export function formatDate (d) {
    var date = new Date(d);
    var YY = date.getFullYear() + '-';
    var MM =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-';
    var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hh =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':';
    var ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
}
/*
 函数名称：formatDate
 功能：将中国标准时间转化为数据库中对应的Timestamp时间戳
 */
/*
    函数名称：stampToTime
    功能：将时间戳转化成24小时制时间
 */
export function stampToTime(timestamp) {
    const date = new Date(timestamp); // 使用时间戳创建Date对象
    const hours = ('0' + date.getUTCHours()).slice(-2); // 获取小时并补零
    const minutes = ('0' + date.getUTCMinutes()).slice(-2); // 获取分钟并补零


     // 格式化时间，例如：04:00
    return hours + ':' + minutes;
}
export function formToDate(inputDate) {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}月${day}日`;
}
/*
获取当前时间yyyy-mm-dd
 */
export function getCurrentTime() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // 月份从0开始，需要加1
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`; // 输出 yyyy-MM-dd 格式的当前日期
}
export default {
    formatDate,
    stampToTime,
    formToDate,
    getCurrentTime
}