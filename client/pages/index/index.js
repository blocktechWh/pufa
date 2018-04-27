//index.js
//获取应用实例
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
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  onShow:function(){
    var winW = wx.getSystemInfoSync().screenWidth;
    var winH = wx.getSystemInfoSync().screenHeight;
    var conH=winH/winW*750-650;

    console.log("conH", conH)
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
