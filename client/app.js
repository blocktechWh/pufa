const util = require('./common/util.js')
const url = require('./common/constant_url.js')

App({
  onLaunch: function () {
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