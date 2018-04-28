// pages/myPrizeDraws/myPrizeDraws.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeDrawList: [
      {
        initiatorImgUrl: "../../resource/images/head.png",
        initiatorName: "柚子酱",
        participantImgs: [
          {
            participantImgUrl: "../../resource/images/head.png",
            positionLeft:"30rpx",
            participantImgIndex:0
            
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
        initiatorImgUrl: "../../resource/images/head.png",
        initiatorName: "柚子酱",
        participantImgUrls: [
          "../../resource/images/head.png",
          "../../resource/images/head.png",
          "../../resource/images/head.png"
        ]
      },
      {
        initiatorImgUrl: "../../resource/images/head.png",
        initiatorName: "柚子酱",
        participantImgUrls: [
          "../../resource/images/head.png",
          "../../resource/images/head.png",
          "../../resource/images/head.png"
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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