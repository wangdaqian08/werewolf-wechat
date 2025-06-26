
// index.js
Page({
  data: {
    currentRound: 1,
    currentDay: 1,
    defaultSpeechTime: 60, // 默认发言时间（秒）
    remainingTime: 60, // 剩余发言时间
    timerInterval: null,
    currentSpeakerIndex: 0,
    players: [
      { seatNumber: 1, name: '玩家1', status: 'speaking', accumulatedTime: 60 },
      { seatNumber: 2, name: '玩家2', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 3, name: '玩家3', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 4, name: '玩家4', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 5, name: '玩家5', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 6, name: '玩家6', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 7, name: '玩家7', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 8, name: '玩家8', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 9, name: '玩家9', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 10, name: '玩家10', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 11, name: '玩家11', status: 'waiting', accumulatedTime: 60 },
      { seatNumber: 12, name: '玩家12', status: 'waiting', accumulatedTime: 60 }
    ]
  },

  // 获取当前发言者
  getCurrentSpeaker() {
    return this.data.players.find(player => player.status === 'speaking') || null
  },

  // 获取发言顺序
  getSpeechOrder() {
    // 按照发言状态排序：speaking -> waiting -> finished
    return [...this.data.players].sort((a, b) => {
      const statusOrder = { speaking: 0, waiting: 1, finished: 2 }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  },

  // 获取计时器百分比
  getTimerPercentage() {
    return (this.data.remainingTime / this.data.defaultSpeechTime) * 100
  },

  // 开始计时器
  startTimer() {
    this.data.timerInterval = setInterval(() => {
      if (this.data.remainingTime > 0) {
        this.setData({
          remainingTime: this.data.remainingTime - 1
        })
      } else {
        this.moveToNextSpeaker()
      }
    }, 1000)
  },

  // 停止计时器
  stopTimer() {
    clearInterval(this.data.timerInterval)
  },

  // 跳过发言
  skipSpeech() {
    this.moveToNextSpeaker()
  },

  // 移动到下一个发言者
  moveToNextSpeaker() {
    // 停止当前计时器
    this.stopTimer()
    
    // 更新当前发言者状态为已完成
    const players = [...this.data.players]
    const currentSpeakerIndex = players.findIndex(player => player.status === 'speaking')
    
    if (currentSpeakerIndex !== -1) {
      players[currentSpeakerIndex].status = 'finished'
    }
    
    // 找到下一个等待发言的玩家
    const nextSpeakerIndex = players.findIndex(player => player.status === 'waiting')
    
    if (nextSpeakerIndex !== -1) {
      players[nextSpeakerIndex].status = 'speaking'
      this.setData({
        players: players,
        remainingTime: players[nextSpeakerIndex].accumulatedTime || this.data.defaultSpeechTime
      })
      this.startTimer()
    } else {
      // 所有玩家都已发言完毕，可以跳转到下一个环节
      this.finishSpeechRound()
    }
  },

  // 完成发言环节
  finishSpeechRound() {
    // 发言环节结束，跳转到投票环节
    wx.navigateTo({
      url: '/pages/Vote/index'
    })
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      speaking: '正在发言',
      waiting: '等待发言',
      finished: '已发言'
    }
    return statusMap[status] || '未知状态'
  },

  onLoad(options) {
    // 初始化发言顺序和计时器
    this.startTimer()
  },

  onUnload() {
    // 页面卸载时清除计时器
    this.stopTimer()
  }
})