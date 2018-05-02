const util = require('./common/util.js')
const url = require('./common/constant_url.js')

App({
  onLaunch: function () {
    // 文件名指定 worker 的入口文件路径，绝对路径
    //var worker = wx.createWorker('workers/request/index.js');
    // worker.postMessage({
    //   msg: 'hello worker'
    // })
    wx.login({
      success: resLogin => {
        const { code } = resLogin
        wx.getUserInfo({
          withCredentials: false,
          success: resUserInfo => {
            const { nickName, avatarUrl } = resUserInfo.userInfo
            util.http_post(url.WxLogin, { code, nickName, avatarUrl }, res => {
              this.globalData.token = res.data.token
              this.globalData.userInfo = res.data.user
              if (this.userInfoReadyCallback) this.userInfoReadyCallback(res.data.user)
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})