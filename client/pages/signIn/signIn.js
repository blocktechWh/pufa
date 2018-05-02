const util = require('../../common/util.js')
const url = require('../../common/constant_url.js')

Page({
  data: {
    isSignIn:false,
    small: ["2", "4", "6", "9", "11"],
    big: ["1", "3", "5", "7", "8", "10", "12"],
    dateTime:"",
    dates: [],
    daysSigned:[],
    check_times:0
  },
  onLoad: function (options) {
    var _this=this;

    //显示当天日期
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    console.log("年份", year);
    console.log("月份", month);

    //获取格式为“yyyy-MM-dd”格式的日期
    var dateTime = util.formatTime(date, 2);
    _this.setData({
      dateTime: dateTime
    })

    //获取签到历史
    util.http_post(url.CheckHistory, {
      year: year,
      month: month.length === 1 ? "0" + month : month
    }, res => {
      console.log("签到历史", res);
      _this.setData({
        isSignIn: res.data.checkInfo.last_visit_time.substr(0, 10) === dateTime ? true : false,
        check_times: res.data.checkInfo.check_times
      })
      _this.operateDaysSigned(res.data.MonthHistory);
      _this.operateCanlender(year, month);

    })

  },
  signIn:function(){
    util.http_get(url.Check, res => {
      console.log("res", res)
    })
  },
  operateDaysSigned:function(data){
    var _this=this;
    var daysSigned = [];
    for (var i = 0; i < data.length;i++){
      daysSigned.push(data[i].substr(8,2));
    }
    _this.data.daysSigned = daysSigned;
  },
  operateCanlender: function (year, month){
    var _this=this;

    //判断是平年还是闰年
    var bol1 = year % 4 == 0;
    var bol2 = year % 100 != 0;
    var bol3 = year % 400 == 0;

    var result = (bol1 && bol2) || bol3 ? "该年是闰年" : "该年的平年";//三目运算符

    /** 获取本月天数**/
    Array.prototype.contains = function (element) {
      for (var i in this) {
        if (this[i] == element) return true;
      }
      return false;
    }
    //判断大月还是小月
    var days = 0;
    if (_this.data.small.contains(month)) {//小月
      days = month === "2" ? (result ? 29 : 28) : 30;
    } else {//大月
      days = 31;
    }
    console.log("days", days);
    //判断本月1号星期几
    var dates = _this.data.dates;
    var date1 = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1);
    var weekNum = date1.getDay();
    var dayNum = 1;
    var dayNumStr=dayNum.toString().length===1?"0"+dayNum:dayNum;
    var daysSigned = _this.data.daysSigned;
    for (var i = 0; i < days + weekNum; i++) {
      if (i < weekNum) {
        console.log(2)
        dates.push({
          dayNum: "",
          dataSigned: false
        });
      } else {
        dates.push({
          dayNum: dayNum,
          dataSigned: daysSigned.contains(dayNumStr) ? true : false
        });
        dayNum++;
        dayNumStr = dayNum.toString().length === 1 ? "0" + dayNum : dayNum;
      }
    }
    _this.setData({
      dates: dates
    })
    console.log("date1", date1);
    console.log("星期", date1.getDay());
  }
})