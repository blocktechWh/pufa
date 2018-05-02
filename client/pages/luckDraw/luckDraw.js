// pages/luckDraw/luckDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    runAngle: 0,
    angleOfSingleTime: 4,
    gameIsOver: false,
    users: [
      {
        name: 1,
        head: "../../resource/images/head.png",
        zIndex:1,
        rotate:0
      },
      {
        name: 2,
        head: "../../resource/images/head.png",
        zIndex: 2,
        rotate: "60deg"
      },
      {
        name: 3,
        head: "../../resource/images/head.png",
        zIndex: 3,
        rotate: "120deg"
      },
      {
        name: 4,
        head: "../../resource/images/head.png",
        zIndex: 4,
        rotate: "180deg"
      },
      {
        name: 5,
        head: "../../resource/images/head.png",
        zIndex: 5,
        rotate: "240deg"
      },
      {
        name: 6,
        head: "../../resource/images/head.png",
        zIndex: 6,
        rotate: "300deg"
      }
    ],
    name:""
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
    this.data.runAngle = 0;
  },

  startGame: function () {
    var _this = this;
    _this.data.angleOfSingleTime = 4;
    var runTime = Math.ceil(2700 + 900 * Math.random());
    console.log("runTime", runTime)
    var currentTime = 0;
    _this.timer = setInterval(function () {
      if (_this.data.runAngle <= -360) {
        _this.data.runAngle = 0;
      }
      _this.setData({
        runAngle: _this.data.runAngle - _this.data.angleOfSingleTime
      })

      if (currentTime >= runTime) {
        clearInterval(_this.timer);
        _this.runToStop();
        console.log("runAngle", _this.data.runAngle)

      } else {
        currentTime += 10;
      }
    }, 10)
  },
  runToStop: function () {
    var _this = this;
    _this.timerToStop = setInterval(function () {
      if (_this.data.angleOfSingleTime >= 0) {
        _this.data.angleOfSingleTime -= 0.01;
        if (_this.data.runAngle <= - 360) {
          _this.data.runAngle = 0;
        }
        _this.setData({
          runAngle: _this.data.runAngle - _this.data.angleOfSingleTime
        })
      } else {
        clearInterval(_this.timerToStop);
        _this.setData({
          gameIsOver: true
        })

        //_this.data.runAngle=0;
        if ((-_this.data.runAngle >= 0 && -_this.data.runAngle < 30) || (-_this.data.runAngle >= 330 && - _this.data.runAngle < 360)) {
          _this.setData({
            name:_this.data.users[0].name
          })
        } else if (-_this.data.runAngle >= 30 && -_this.data.runAngle < 90) {
          _this.setData({
            name: _this.data.users[1].name
          })
        } else if (-_this.data.runAngle >= 90 && -_this.data.runAngle < 150) {
          _this.setData({
            name: _this.data.users[2].name
          })
        } else if (-_this.data.runAngle >= 150 && -_this.data.runAngle < 210) {
          _this.setData({
            name: _this.data.users[3].name
          })
        } else if (-_this.data.runAngle >= 210 && -_this.data.runAngle < 270) {
          _this.setData({
            name: _this.data.users[4].name
          })
        } else if (-_this.data.runAngle >= 270 && -_this.data.runAngle < 330) {
          _this.setData({
            name: _this.data.users[5].name
          })
        }
        _this.setData({
          gameIsOver: true
        })

      }

    }, 10)
  },
  closeModel:function(){
    var _this=this;
    _this.setData({
      gameIsOver:false,
      runAngle:0
    })

  },
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '拼团抽奖送好礼！',
      //path: 'http://dingyeap.com/api/joinAction?id=' + this.data.id,
      path: '/pages/detail2/detail2?shareActionId=' + this.data.id,
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