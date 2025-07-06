// index.js
Page({
  data: {
      roomNumber: "123456",
    currentDay: 1,
      currentStage: "night_werewolf",
    completedStages: [],
    showRoles: true,
    autoVoice: true,
    gameStages: [
        {id: "night_werewolf", name: "狼人行动"},
        {id: "night_witch", name: "女巫行动"},
        {id: "night_seer", name: "预言家行动"},
        {id: "night_guard", name: "守卫行动"},
        {id: "day_announce", name: "公布死亡信息"},
        {id: "day_speech", name: "玩家发言"},
        {id: "day_vote", name: "投票环节"},
    ],
    players: [
      {
          seatNumber: 1,
          name: "玩家1",
          role: "狼人",
          alive: true,
      },
      {
          seatNumber: 2,
          name: "玩家2",
          role: "狼人",
          alive: true,
      },
      {
          seatNumber: 3,
          name: "玩家3",
          role: "村民",
          alive: true,
      },
      {
          seatNumber: 4,
          name: "玩家4",
          role: "村民",
          alive: true,
      },
      {
          seatNumber: 5,
          name: "玩家5",
          role: "女巫",
          alive: true,
      },
      {
          seatNumber: 6,
          name: "玩家6",
          role: "预言家",
          alive: true,
      },
      {
          seatNumber: 7,
          name: "玩家7",
          role: "村民",
          alive: true,
      },
      {
          seatNumber: 8,
          name: "玩家8",
          role: "村民",
          alive: true,
      },
      {
          seatNumber: 9,
          name: "玩家9",
          role: "守卫",
          alive: true,
      },
      {
          seatNumber: 10,
          name: "玩家10",
          role: "村民",
          alive: false,
      },
      {
          seatNumber: 11,
          name: "玩家11",
          role: "狼人",
          alive: true,
      },
      {
          seatNumber: 12,
          name: "玩家12",
          role: "村民",
          alive: true,
      },
    ],
  },

  // 跳转到指定阶段
  goToStage(e) {
    const stageId = e.currentTarget.dataset.stage;
    this.setData({
      currentStage: stageId,
    });
    // 这里应该有跳转到对应阶段的逻辑
  },

  // 跳过当前阶段
  skipStage(e) {
    const stageId = e.currentTarget.dataset.stage;
      const currentIndex = this.data.gameStages.findIndex(
          (stage) => stage.id === stageId,
      );

    if (currentIndex < this.data.gameStages.length - 1) {
      const completedStages = [...this.data.completedStages, stageId];
      this.setData({
        completedStages,
        currentStage: this.data.gameStages[currentIndex + 1].id,
      });
    } else {
      // 如果是最后一个阶段，进入下一天
      this.setData({
        completedStages: [],
        currentDay: this.data.currentDay + 1,
        currentStage: this.data.gameStages[0].id,
      });
    }
  },

  // 切换玩家状态（死亡/存活）
  togglePlayerStatus(e) {
    const seatNumber = e.currentTarget.dataset.seat;
    const players = [...this.data.players];
      const playerIndex = players.findIndex(
          (player) => player.seatNumber === seatNumber,
      );

    if (playerIndex !== -1) {
      players[playerIndex].alive = !players[playerIndex].alive;
      this.setData({
        players,
      });
    }
  },

  // 切换显示角色开关
  toggleShowRoles(e) {
    this.setData({
      showRoles: e.detail.value,
    });
  },

  // 切换自动语音开关
  toggleAutoVoice(e) {
    this.setData({
      autoVoice: e.detail.value,
    });
  },

  // 结束游戏
  endGame() {
    wx.showModal({
        title: "确认结束",
        content: "确定要结束当前游戏吗？",
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
              url: "/pages/Home/index",
          });
        }
      },
    });
  },

  // 重新开始游戏
  restartGame() {
    wx.showModal({
        title: "确认重新开始",
        content: "确定要重新开始游戏吗？所有进度将被重置。",
      success: (res) => {
        if (res.confirm) {
          const players = this.data.players.map((player) => ({
            ...player,
            alive: true,
          }));

          this.setData({
            currentDay: 1,
              currentStage: "night_werewolf",
            completedStages: [],
            players,
          });
        }
      },
    });
  },
});
