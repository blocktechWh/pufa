// pages/myPrizes/myPrizes.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginLeft:0,
    tabColor1:"#fff",
    tabColor2: "rgb(30, 30, 30)",
    left1:"0",
    left2:"750rpx",
    prizeList1:[
      {
        prizeImg:"../../resource/images/prize1.png",
        prizeName:"电子产品"
      },
      {
        prizeImg: "../../resource/images/prize2.png",
        prizeName: "10积分"
      },
      {
        prizeImg: "../../resource/images/prize1.png",
        prizeName: "电子产品"
      },
    ],
    prizeList2: [
      {
        prizeImg: "../../resource/images/prize1.png",
        prizeName: "电子产品",
        gotTime:"2018-04-15"
      },
      {
        prizeImg: "../../resource/images/prize2.png",
        prizeName: "10积分",
        gotTime: "2018-04-15"
      },
      {
        prizeImg: "../../resource/images/prize1.png",
        prizeName: "电子产品",
        gotTime: "2018-04-15"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabClick:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.setData({
      marginLeft: index==="1"?"0":"375rpx",
      tabColor1: index === "1" ? "#fff" : "rgb(30, 30, 30)",
      tabColor2: index === "2" ? "#fff" : "rgb(30, 30, 30)",
      left1: index === "1" ? "0" : "-750rpx",
      left2: index === "2" ? "0" : "750rpx",
    })

  },
  recieveNow:function(){
    wx.navigateTo({
      url: '../../pages/',
    })
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