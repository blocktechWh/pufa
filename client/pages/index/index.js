var request = require('../../utils/request.js');
const app = getApp();

Page({
  data: {
    height1: "",
    height2: "",
    index_content: "index-content"
  },
  onLoad: function () {
    var self = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res,
          hasUserInfo: true
        })
      }
    }
  },
  onShow: function () {
    var winW = wx.getSystemInfoSync().screenWidth;
    var winH = wx.getSystemInfoSync().screenHeight;
    var conH = winH / winW * 750 - 623;

    // console.log("conH", conH)
    this.setData({
      conH: conH,
      height1: conH / 2,
      height2: (conH - 240) / 2
    })
  },
  getMoreJiFen: function () {
    wx.navigateTo({
      url: '../steps/steps',
    })
  },
  example: function () {
    wx.navigateTo({
      url: '../../weui/dist/example/grid/grid',
    })
  },
  openOnline: function () {
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '跳转到' + '"' + '浦发信用卡' + '"' +'小程序办理',
    })
  },
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res);
      console.log(res.target);
    }
    return {
      title: '拼团抽奖送好礼！',
      path: '/pages/luckDraw/luckDraw?shareActionId=1',
      success: function (res) {
        // 转发成功
        console.log("转发成功");
        _this.setData({
          gameIsOver: false,
          runAngle: 0
        })

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
        _this.setData({
          gameIsOver: false,
          runAngle: 0
        })
      }
    }
  },


})
