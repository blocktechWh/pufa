const CONF = {
  port: '5757',
  rootPathname: '',
  appId: 'wxdf98b3bc862bda45',
  appSecret: 'f4b0c953b9f65783b3fb770720c82620',
  useQcloudLogin: true,
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'pufa',
    pass: 'wxdf98b3bc862bda45',
    // pass: '',
    char: 'utf8mb4'
  },
  cos: {
    region: 'cn-south',
    fileBucket: 'qcloudtest',
    uploadFolder: ''
  },
  wxLoginExpires: 7200,
  jwtSecret: 'wx_pufa_xcx'
}

module.exports = CONF;