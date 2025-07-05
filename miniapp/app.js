
// app.js
App({
  onLaunch() {
    // 小程序启动时执行的逻辑
    console.log('小程序启动')
    
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.systemInfo = systemInfo
    
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本下载失败，请检查网络后重试'
            })
          })
        }
      })
    }

    // 统一登录方法
    this.login()
  },

  // TODO this is not ready, login requires backnend app ready
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async res => {
          try {
            const code = res.code;
            console.log(`code: ${code}`);
            const data = await new Promise((resolve, reject) => {
              wx.request({
                url: 'https://localhost:8443/login',
                header: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                data: { code }, // use actual code
                success: res => {
                  console.log(res.data);
                  resolve(res.data);
                },
                fail: err => {
                  console.error(err);
                  reject(err);
                }
              });
            });
            console.log(`backend response: ${JSON.stringify(data)}`);
            // Uncomment and use if needed:
            // this.globalData.userId = data.user_id;
            // resolve(data);
          } catch (error) {
            console.log(`error: ${JSON.stringify(error)}`);
            reject(error);
          }
        },
        fail: reject
      });
    });
  },
  
  /**
   * Called when the mini-program is displayed.
   * This lifecycle hook executes when the mini-program becomes visible.
   */
  onShow() {
    // 小程序显示时执行的逻辑
    console.log('小程序显示')
  },
  
  onHide() {
    // 小程序隐藏时执行的逻辑
    console.log('小程序隐藏')
  },
  
  onError(err) {
    // 小程序发生错误时执行的逻辑
    console.error('小程序错误：', err)
  },
  
  globalData: {
    userInfo: null,
    systemInfo: null,
    currentRoom: null,
    gameState: null,
    userId:null,
  }
})