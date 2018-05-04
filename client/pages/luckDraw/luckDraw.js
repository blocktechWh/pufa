// pages/luckDraw/luckDraw.js
const util = require('../../common/util.js');
const url = require('../../common/constant_url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lotteryId:0,
    runAngle: 0,
    angleOfSingleTime: 4,
    gameIsOver: false,
    users: [],
    name:"",
    canOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    
    //获取抽奖信息
    _this.queryLuckDrawInfo();

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
  queryLuckDrawInfo: function () { 
    var _this=this;
    var users = [];
    
    util.http_get(url.LuckDrawInfo, res => {
      console.log("抽奖信息", res);
      _this.data.lotteryId=res.data.id;
      //渲染用户
      var joiner = res.data.joiner;
      for (var i = 0; i < 6;i++){
        if (i < joiner.length){
          users.push({
            name: joiner[i].user.name,
            head: joiner[i].user.image_url,
            zIndex: i + 1,
            rotate: i * 60 + "deg",
            u_id: joiner[i].user.u_id
          })
        }else{
          users.push({
            name: "等待加入",
            head: "../../resource/images/no_jioner.png",
            zIndex: i + 1,
            rotate: i * 60 + "deg",
            u_id: ""
          })
        }

      }
      _this.setData({
        users: users
      })

      //抽奖状态
      var status = res.data.status;

      if (status === 0) {//可以开奖
        _this.data.canOpen = true;
      } else if (status === 1) {//人数不足
        _this.data.canOpen = false;
      } else if (status === 2) {//已创建抽奖
        _this.data.canOpen = joiner.length < 6?false:true;
      }
    })
  },
  startGame: function () {
    var _this = this;
    if (!_this.data.canOpen){
      wx.showModal({
        title: '提示',
        content: '参与人数不足，添加好友后再开奖吧',
        showCancel:false
      })
      return false;
    }
    util.http_post(url.StartLuckDraw, {
      lotteryId: _this.data.lotteryId
    },res => {
      console.log("开奖", res);
    })
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
    console.log(333)
    return {
      title: '拼团抽奖送好礼！',
      path: '/pages/LuckDrawActions/LuckDrawActions?lotteryId=' + _this.data.lotteryId,
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
})