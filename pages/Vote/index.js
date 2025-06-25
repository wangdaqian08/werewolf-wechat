
// index.js
Page({
  data: {
    currentDay: 1,
    currentRound: 1,
    voteStage: 'voting', // 'voting' or 'results'
    remainingTime: 30, // 投票倒计时
    timerInterval: null,
    selectedPlayer: null,
    players: [
      { seatNumber: 1, name: '玩家1', alive: true, votes: 0, votedFor: null },
      { seatNumber: 2, name: '玩家2', alive: true, votes: 0, votedFor: null },
      { seatNumber: 3, name: '玩家3', alive: true, votes: 0, votedFor: null },
      { seatNumber: 4, name: '玩家4', alive: true, votes: 0, votedFor: null },
      { seatNumber: 5, name: '玩家5', alive: true, votes: 0, votedFor: null },
      { seatNumber: 6, name: '玩家6', alive: true, votes: 0, votedFor: null },
      { seatNumber: 7, name: '玩家7', alive: true, votes: 0, votedFor: null },
      { seatNumber: 8, name: '玩家8', alive: true, votes: 0, votedFor: null },
      { seatNumber: 9, name: '玩家9', alive: true, votes: 0, votedFor: null },
      { seatNumber: 10, name: '玩家10', alive: true, votes: 0, votedFor: null },
      { seatNumber: 11, name: '玩家11', alive: true, votes: 0, votedFor: null },
      { seatNumber: 12, name: '玩家12', alive: true, votes: 0, votedFor: null }
    ],
    currentPlayer: { seatNumber: 5, name: '玩家5' }, // 当前玩家
    eliminatedPlayers: [], // 被放逐的玩家
    maxVoteRounds: 2 // 最大投票轮数
  },

  // 获取存活玩家列表
  getAlivePlayers() {
    return this.data.players.filter(player => 
      player.alive && player.seatNumber !== this.data.currentPlayer.seatNumber
    )
  },

  // 获取投票结果列表
  getVotingResults() {
    return this.data.players.filter(player => 
      player.alive && player.votedFor !== null
    )
  },

  // 获取玩家名称
  getPlayerName(seatNumber) {
    const player = this.data.players.find(p => p.seatNumber === seatNumber)
    return player ? player.name : '未知玩家'
  },

  // 开始计时器
  startTimer() {
    this.data.timerInterval = setInterval(() => {
      if (this.data.remainingTime > 0) {
        this.setData({
          remainingTime: this.data.remainingTime - 1
        })
      } else {
        this.autoSubmitVote()
      }
    }, 1000)
  },

  // 停止计时器
  stopTimer() {
    clearInterval(this.data.timerInterval)
  },

  // 选择玩家
  selectPlayer(e) {
    const seatNumber = e.currentTarget.dataset.seat
    this.setData({
      selectedPlayer: seatNumber
    })
  },

  // 提交投票
  submitVote() {
    if (this.data.selectedPlayer) {
      // 记录当前玩家的投票
      const players = [...this.data.players]
      const playerIndex = players.findIndex(p => p.seatNumber === this.data.currentPlayer.seatNumber)
      if (playerIndex !== -1) {
        players[playerIndex].votedFor = this.data.selectedPlayer
      }
      
      // 模拟其他玩家的投票
      this.simulateOtherPlayersVoting(players)
      
      // 计算投票结果
      this.calculateVoteResults(players)
      
      // 显示结果
      this.setData({
        players: players,
        voteStage: 'results'
      })
      this.stopTimer()
    }
  },

  // 自动提交投票
  autoSubmitVote() {
    if (!this.data.selectedPlayer) {
      // 如果没有选择，随机选择一个玩家
      const alivePlayers = this.getAlivePlayers()
      const randomIndex = Math.floor(Math.random() * alivePlayers.length)
      this.setData({
        selectedPlayer: alivePlayers[randomIndex].seatNumber
      })
    }
    this.submitVote()
  },

  // 模拟其他玩家投票
  simulateOtherPlayersVoting(players) {
    players.forEach(player => {
      if (player.alive && player.seatNumber !== this.data.currentPlayer.seatNumber) {
        // 随机选择一个存活的玩家进行投票
        const validTargets = players.filter(p => 
          p.alive && p.seatNumber !== player.seatNumber
        )
        if (validTargets.length > 0) {
          const randomIndex = Math.floor(Math.random() * validTargets.length)
          player.votedFor = validTargets[randomIndex].seatNumber
        }
      }
    })
  },

  // 计算投票结果
  calculateVoteResults(players) {
    // 重置票数
    players.forEach(player => {
      player.votes = 0
    })
    
    // 计算每个玩家获得的票数
    players.forEach(player => {
      if (player.alive && player.votedFor !== null) {
        const votedPlayer = players.find(p => p.seatNumber === player.votedFor)
        if (votedPlayer) {
          votedPlayer.votes++
        }
      }
    })
    
    // 找出票数最高的玩家
    let maxVotes = 0
    players.forEach(player => {
      if (player.votes > maxVotes) {
        maxVotes = player.votes
      }
    })
    
    // 找出所有获得最高票数的玩家
    const highestVotedPlayers = players.filter(player => player.votes === maxVotes)
    
    // 处理投票结果
    if (highestVotedPlayers.length === 1) {
      // 唯一最高票，该玩家被放逐
      this.setData({
        eliminatedPlayers: [...highestVotedPlayers]
      })
      // 标记玩家为死亡
      const eliminatedIndex = players.findIndex(p => p.seatNumber === highestVotedPlayers[0].seatNumber)
      if (eliminatedIndex !== -1) {
        players[eliminatedIndex].alive = false
      }
    } else if (this.data.currentRound < this.data.maxVoteRounds) {
      // 平票，进行下一轮投票
      this.setData({
        eliminatedPlayers: []
      })
    } else {
      // 已达到最大投票轮数，仍然平票，跳过放逐
      this.setData({
        eliminatedPlayers: []
      })
    }
  },

  // 继续游戏
  continueGame() {
    if (this.data.eliminatedPlayers.length === 0 && this.data.currentRound < this.data.maxVoteRounds) {
      // 平票，进行下一轮投票
      this.setData({
        currentRound: this.data.currentRound + 1
      })
      this.resetVoting()
    } else {
      // 投票结束，进入夜晚阶段
      wx.navigateTo({
        url: '/pages/NightAction/index'
      })
    }
  },

  // 重置投票状态
  resetVoting() {
    const players = this.data.players.map(player => ({
      ...player,
      votedFor: null,
      votes: 0
    }))
    
    this.setData({
      voteStage: 'voting',
      selectedPlayer: null,
      remainingTime: 30,
      players: players
    })
    this.startTimer()
  },

  onLoad() {
    // 初始化投票
    this.startTimer()
  },

  onUnload() {
    // 页面卸载时清除计时器
    this.stopTimer()
  }
})