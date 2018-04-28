'use strict';

exports.__esModule = true;
exports.default = {
    isToday: function isToday(theDate) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
        var tommorow = new Date(today + 24 * 3600 * 1000).getTime();
        return theDate.getTime() >= today && tommorow > theDate.getTime();
    },
    isYestday: function isYestday(theDate) {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
        var yestday = new Date(today - 24 * 3600 * 1000).getTime();
        return theDate.getTime() < today && yestday <= theDate.getTime();
    }
};
module.exports = exports['default'];