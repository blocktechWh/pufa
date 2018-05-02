var host = 'https://glippnic.qcloud.la/webapi'

module.exports = {
  WxLogin: host + '/user/login',//登录
  UserInfo: host + '/user/info',//获取用户信息
  
  Check: host + '/check',//签到
  CheckHistory: host + '/check/history'//获取某个月的签到历史
}