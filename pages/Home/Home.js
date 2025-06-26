
// index.js
Page({
  data: {
    title: '狼人杀',
    subtitle: '线下面杀助手'
  },

  onLoad() {
    console.log('页面加载完成'); 
    wx.createSelectorQuery()
      .select('.container')
      .boundingClientRect(rect => {
        console.log('容器尺寸:', rect)
      })
      .exec()
  },

  // 跳转到加入房间页面
  navigateToJoinRoom() {
    wx.navigateTo({
      url: '/pages/JoinRoom/JoinRoom'
    })
  }
})