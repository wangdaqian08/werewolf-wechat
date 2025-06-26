
// index.js
Page({
  data: {
    identityOptions: ['未标记', '狼人', '村民', '预言家', '女巫', '守卫', '猎人', '可疑', '已查验', '已排除'],
    gameNotes: '',
    players: [
      { seatNumber: 1, name: '玩家1', alive: true, tag: '未标记' },
      { seatNumber: 2, name: '玩家2', alive: true, tag: '狼人' },
      { seatNumber: 3, name: '玩家3', alive: true, tag: '村民' },
      { seatNumber: 4, name: '玩家4', alive: true, tag: '预言家' },
      { seatNumber: 5, name: '玩家5', alive: true, tag: '女巫' },
      { seatNumber: 6, name: '玩家6', alive: true, tag: '守卫' },
      { seatNumber: 7, name: '玩家7', alive: true, tag: '猎人' },
      { seatNumber: 8, name: '玩家8', alive: true, tag: '可疑' },
      { seatNumber: 9, name: '玩家9', alive: true, tag: '已查验' },
      { seatNumber: 10, name: '玩家10', alive: false, tag: '已排除' },
      { seatNumber: 11, name: '玩家11', alive: true, tag: '未标记' },
      { seatNumber: 12, name: '玩家12', alive: true, tag: '未标记' }
    ]
  },

  // 获取玩家标签索引
  getPlayerTagIndex(seatNumber) {
    const player = this.data.players.find(p => p.seatNumber === seatNumber)
    if (player && player.tag) {
      const index = this.data.identityOptions.indexOf(player.tag)
      return index !== -1 ? index : 0
    }
    return 0 // 默认为"未标记"
  },

  // 更新玩家标签
  updatePlayerTag(e) {
    const seatNumber = parseInt(e.currentTarget.dataset.seat)
    const tagIndex = parseInt(e.detail.value)
    
    const players = [...this.data.players]
    const playerIndex = players.findIndex(p => p.seatNumber === seatNumber)
    
    if (playerIndex !== -1) {
      players[playerIndex].tag = this.data.identityOptions[tagIndex]
      this.setData({
        players: players
      })
    }
  },

  // 获取标签样式类
  getTagClass(tag) {
    const tagClasses = {
      '未标记': 'tag-none',
      '狼人': 'tag-werewolf',
      '村民': 'tag-villager',
      '预言家': 'tag-seer',
      '女巫': 'tag-witch',
      '守卫': 'tag-guard',
      '猎人': 'tag-hunter',
      '可疑': 'tag-suspicious',
      '已查验': 'tag-checked',
      '已排除': 'tag-excluded'
    }
    return tagClasses[tag] || 'tag-none'
  },

  // 更新游戏笔记
  updateGameNotes(e) {
    this.setData({
      gameNotes: e.detail.value
    })
  },

  // 保存标记和笔记
  saveChanges() {
    // 保存标记和笔记的逻辑
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
  },

  // 清除所有标记
  clearAllTags() {
    // 显示确认对话框
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有标记吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除所有标记
          const players = this.data.players.map(player => ({
            ...player,
            tag: '未标记'
          }))
          
          this.setData({
            players: players,
            gameNotes: ''
          })
          
          wx.showToast({
            title: '已清除所有标记',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
})