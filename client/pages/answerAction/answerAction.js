// pages/answerAction/answerAction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic:{
      qustion:"1.题目内容",
      answerSelects:[
        {
          answerText: "A.答案一",
          answerIndex:0
        },
        {
          answerText: "B.答案二",
          answerIndex: 1
        },
        {
          answerText: "C.答案三",
          answerIndex: 2
        },
        {
          answerText: "D.答案四",
          answerIndex: 3
        },
        
      ]
    }
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
  answerResult:function(){
    wx.navigateTo({
      url: '../../pages/answerResult/answerResult',
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