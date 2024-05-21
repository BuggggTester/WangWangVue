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

export default {
    formatDate
}