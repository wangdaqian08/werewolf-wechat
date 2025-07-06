// index.js
Page({
  data: {
    title: '狼人杀',
    subtitle: '线下面杀助手',
    hasUserInfo: false, // 初始状态为未授权
    showAuthButton: false, // 初始状态不显示授权button
    showJoinRoomInput: false,
  },

  onLoad() {
    console.log('页面加载完成');
    this.checkAuthStatus();
  },

  checkAuthStatus() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已授权
          this.getUserInfo();
        } else {
          // 未授权或已拒绝
          this.setData({
            showAuthButton: true,
            hasUserInfo: false,
          });
        }
      },
      fail: () => {
        // 获取设置失败（网络问题等）
        this.setData({
          showAuthButton: true,
          hasUserInfo: false,
        });
        wx.showToast({ title: '获取授权设置失败', icon: 'none' });
      },
    });
  },

  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      this.setData({
        hasUserInfo: true,
        showAuthButton: false,
      });
      getApp().globalData.userInfo = e.detail.userInfo;
    } else {
      // 用户拒绝授权
      this.setData({ showAuthButton: true });
      wx.showToast({ title: '需要授权才能加入游戏', icon: 'none' });
      // 引导用户手动打开
      this.forceUserReAuthenticate();
    }
  },

  forceUserReAuthenticate() {
    wx.showModal({
      title: '授权提示',
      content: '需要授权才能使用完整功能',
      success: (res) => {
        if (res.confirm) {
          // 引导用户手动打开设置页
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                this.getUserInfo();
              }
            },
          });
        }
      },
    });
  },

  // 跳转到加入房间页面
  navigateToJoinRoom() {
    if (!getApp().globalData.userInfo) {
      wx.showToast({ title: '请先授权登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/JoinRoom/JoinRoom',
    });
  },

  // 跳转到创建房间
  navigateToCreateRoom() {
    wx.navigateTo({
      url: '/pages/CreateRoom/CreateRoom',
    });
  },


});
