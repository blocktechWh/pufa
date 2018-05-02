// pages/steps/steps.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: 0,
    stepsIndex: 0,
    stepsCount: 0,
    stepsInfoList: [
      {
        date: "4/20",
        steps: 20000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left:"5rpx"
      },
      {
        date: "4/21",
        steps: 6000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "95rpx"
      },
      {
        date: "4/22",
        steps: 10000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "185rpx"
      },
      {
        date: "4/23",
        steps: 3000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "275rpx"
      },
      {
        date: "4/24",
        steps: 4500,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "365rpx"
      },
      {
        date: "4/25",
        steps: 7000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "455rpx"
      },
      {
        date: "4/26",
        steps: 8000,
        stepsCurrent: 0,
        bottom: "10rpx",
        left: "545rpx"
      }
    ],

    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    tabState: "info",
    stepsGroup: [3000, 5000, 12000, 6000, 8000, 2000, 4500]
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
    this.drawProgressbg();
    //this.drawCircle(2);
    this.countInterval();
    //this.drawStepsbg(3)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);// 设置圆环的宽度
    ctx.setStrokeStyle('#cccccc'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath();//开始一个新的路径
    ctx.arc(83, 83, 78, 0, 2 * Math.PI, true);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#5284ff");
    gradient.addColorStop("0.5", "#c347ff");
    gradient.addColorStop("1.0", "#5284ff");

    context.setLineWidth(8);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(83, 83, 78, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  drawStepsbg: function (drawLong, i) {
    var context = wx.createCanvasContext('canvasSteps' + i);

    // 设置渐变
    var gradient = context.createLinearGradient(25, 233, 25, 0);
    gradient.addColorStop("0", "#5284ff");
    gradient.addColorStop("0.5", "#c347ff");
    gradient.addColorStop("1.0", "#5284ff");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.moveTo(24.5, 223)
    context.lineTo(24.5, 223 - drawLong)
    context.stroke()
    context.draw()
  },
  countInterval: function () {
    // 设置倒计时 定时器 每40毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 50) {
        /* 绘制彩色圆环进度条 
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 50 对应 2 做处理，计数器steps=50的时候step=2
        */
        this.drawCircle(this.data.count / (50 / 2))
        if (this.data.count > 0) {
          var progress_txt = this.data.progress_txt + 200;
          this.setData({
            progress_txt: progress_txt
          });
        }

        this.data.count++;

      } else {

        clearInterval(this.countTimer);
      }
    }, 40)
  },
  countStepsInterval: function (ind) {
    var _this = this;
    //_this.countStepsInterval(ind+1);
    // 设置倒计时 定时器 每40毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    _this.countTimer1 = setInterval(() => {

      if (_this.data.stepsCount <= 50) {
        /* 绘制彩色圆环进度条 
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 50 对应 2 做处理，计数器count=50的时候step=2
        */
        //var index = _this.data.stepsIndex,
        var index = ind,
          stepsInfoList = _this.data.stepsInfoList,
          drawLong = (_this.data.stepsCount / 50) * 100 * (stepsInfoList[index].steps / 10000) * (_this.data.stepsCount / 50);

        
        var stepsCurrent = stepsInfoList[index].steps * (_this.data.stepsCount / 50);
        //console.log("stepsCurrent", stepsCurrent)
        stepsInfoList[index].stepsCurrent = Math.ceil(stepsCurrent);
        stepsInfoList[index].bottom = (drawLong*2 + 10) + "rpx";
        _this.data.stepsCount++;
        _this.setData({
          stepsInfoList: stepsInfoList
        })
        _this.drawStepsbg(drawLong, index + 1);

      // } else if (_this.data.stepsIndex < 6) {
      //   _this.data.stepsIndex++;
      //   console.log("_this.data.stepsIndex", _this.data.stepsIndex)
      //   _this.data.stepsCount = 0;

      } else {
        clearInterval(_this.countTimer1);
      }
    }, 15)
  },
  tabClick: function (e) {
    var _this=this;
    console.log(e)
    if (e.currentTarget.dataset.state === "info") {
      _this.setData({
        tabState: "info"
      })

    } else {
      _this.setData({
        tabState: "history"
      })
      const worker = wx.createWorker('../../utils/test.js');  

      console.log(worker)
      // setTimeout(function(){
      //   _this.countStepsInterval(0)
      // }, 10);
      // setTimeout(function () {
      //   _this.countStepsInterval(1)
      // }, 20);
      // setTimeout(function () {
      //   _this.countStepsInterval(2)
      // }, 30);
      // setTimeout(function () {
      //   _this.countStepsInterval(3)
      // }, 40);
      // setTimeout(function () {
      //   _this.countStepsInterval(4)
      // }, 50);
      // setTimeout(function () {
      //   _this.countStepsInterval(5)
      // }, 60);
      // setTimeout(function () {
      //   _this.countStepsInterval(6)
      // }, 70);
      // var a1 =setTimeout(_this.countStepsInterval(1), 1);
      // var a2 =setTimeout(_this.countStepsInterval(2), 1);
      // var a3 =setTimeout(_this.countStepsInterval(3), 1);
      // var a4 =setTimeout(_this.countStepsInterval(4), 1);
      // var a5 =setTimeout(_this.countStepsInterval(5), 1);
      // var a6 =setTimeout(_this.countStepsInterval(6), 1);
      _this.countStepsInterval(0);
      _this.countStepsInterval(1);
      _this.countStepsInterval(2);
      _this.countStepsInterval(3);
      _this.countStepsInterval(4);
      _this.countStepsInterval(5);
      _this.countStepsInterval(6);
 
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