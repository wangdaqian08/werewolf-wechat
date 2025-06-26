
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
  },
  
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
    gameState: null
  }
})