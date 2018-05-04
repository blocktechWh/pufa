// pages/myPrizeDraws/myPrizeDraws.js
const util = require('../../common/util.js');
const url = require('../../common/constant_url.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotteryId:0,
    prizeDrawList: [
      {
        initiatorImgUrl: "../../resource/images/head1.png",
        initiatorName: "柚子酱",
        participantImgs: [
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "30rpx",
            participantImgIndex: 0

          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "65rpx",
            participantImgIndex: 1
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "90rpx",
            participantImgIndex: 2
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "125rpx",
            participantImgIndex: 3
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "160rpx",
            participantImgIndex: 4
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "195rpx",
            participantImgIndex: 5
          },

        ]
      },
      {
        initiatorImgUrl: "../../resource/images/head1.png",
        initiatorName: "柚子酱",
        participantImgs: [
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "30rpx",
            participantImgIndex: 0

          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "65rpx",
            participantImgIndex: 1
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "90rpx",
            participantImgIndex: 2
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "125rpx",
            participantImgIndex: 3
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "160rpx",
            participantImgIndex: 4
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "195rpx",
            participantImgIndex: 5
          },

        ]
      },
      {
        initiatorImgUrl: "../../resource/images/head1.png",
        initiatorName: "柚子酱",
        participantImgs: [
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "30rpx",
            participantImgIndex: 0

          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "65rpx",
            participantImgIndex: 1
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "90rpx",
            participantImgIndex: 2
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "125rpx",
            participantImgIndex: 3
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "160rpx",
            participantImgIndex: 4
          },
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft: "195rpx",
            participantImgIndex: 5
          },

        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    console.log("options", options);
    if (options.lotteryId) {
      _this.data.lotteryId = options.lotteryId

      //登陆
      _this.userLogin();
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  joinAction:function(){
    var _this=this;
    util.http_post(url.JionLuckDraw,{
      lotteryId: _this.data.lotteryId
    }, res => {
      console.log("参与抽奖", res);


    })
  },
  luckDrawDetail: function () {
    wx.navigateTo({
      url: '../../pages/luckDrawDetail/luckDrawDetail',
    })
  },
  userLogin:function(){
    var _this=this;
    wx.login({
      success: resLogin => {
        const { code } = resLogin
        wx.getUserInfo({
          withCredentials: false,
          success: resUserInfo => {
            const { nickName, avatarUrl } = resUserInfo.userInfo
            util.http_post(url.WxLogin, { code, nickName, avatarUrl }, res => {
              app.globalData.token = res.data.token
              app.globalData.userInfo = res.data.user
              if (app.userInfoReadyCallback) app.userInfoReadyCallback(res.data.user);
              _this.joinAction();
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})