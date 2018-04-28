var request = require('../../utils/request.js');
const app=getApp();

Page({
  data: {
    height1:"",
    height2:"",
    index_content:"index-content"
  },
  onLoad:function(){
    var self=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else{
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res,
          hasUserInfo: true
        })
      }
    }
  },
  onShow:function(){
    var winW = wx.getSystemInfoSync().screenWidth;
    var winH = wx.getSystemInfoSync().screenHeight;
    var conH=winH/winW*750-650;

    // console.log("conH", conH)
    this.setData({
      conH: conH,
      height1: conH/2+"rpx",
      height2: (conH-240) / 2 + "rpx"
    })
  },
  getMoreJiFen:function(){
    wx.navigateTo({
      url: '../steps/steps',
    })
  },
  example:function(){
    wx.navigateTo({
      url: '../../weui/dist/example/grid/grid',
    })
  }

  
})
