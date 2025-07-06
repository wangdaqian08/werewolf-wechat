// index.js
Page({
  data: {
    currentDay: 1,
    currentRole: "werewolf", // 当前行动角色
    roleOrder: ["werewolf", "witch", "seer", "guard"], // 角色行动顺序
    currentRoleIndex: 0,
    isCurrentPlayer: true, // 是否当前玩家的回合
    players: [
      {
        seatNumber: 1,
        name: "玩家1",
        alive: true,
        role: "villager",
      },
      {
        seatNumber: 2,
        name: "玩家2",
        alive: true,
        role: "werewolf",
      },
      {
        seatNumber: 3,
        name: "玩家3",
        alive: true,
        role: "witch",
      },
      {
        seatNumber: 4,
        name: "玩家4",
        alive: true,
        role: "seer",
      },
      {
        seatNumber: 5,
        name: "玩家5",
        alive: true,
        role: "guard",
      },
    ],
    selectedTarget: null, // 狼人选择的目标
    selectedPoisonTarget: null, // 女巫毒药目标
    selectedCheckTarget: null, // 预言家查验目标
    selectedGuardTarget: null, // 守卫守护目标
    lastGuardedPlayer: null, // 上一晚守护的玩家
    hasSavePotion: true, // 女巫是否有解药
    hasPoisionPotion: true, // 女巫是否有毒药
    killedPlayer: null, // 被狼人杀死的玩家
    showDeathInfo: false, // 是否显示死亡信息
    usedSavePotion: false, // 是否使用了解药
    checkedPlayers: [], // 已经查验过的玩家
    roles: {
      werewolf: {
        name: "狼人",
        description: "每晚可以杀死一名玩家，目标是消灭所有好人。",
        image: "/static/images/werewolf.png",
      },
      witch: {
        name: "女巫",
        description: "拥有一瓶解药和一瓶毒药。",
        image: "/static/images/witch.png",
      },
      seer: {
        name: "预言家",
        description: "每晚可以查验一名玩家的身份。",
        image: "/static/images/seer.png",
      },
      guard: {
        name: "守卫",
        description: "每晚可以保护一名玩家不被狼人杀死。",
        image: "/static/images/guard.png",
      },
    },
  },

  // 获取角色图片路径
  getRoleImageSrc() {
    return `/static/images/${this.data.currentRole}.png`;
  },

  // 获取角色名称
  getRoleName() {
    const role = this.data.roles[this.data.currentRole];
    return role ? role.name : "未知角色";
  },

  // 获取角色描述
  getRoleDescription() {
    const role = this.data.roles[this.data.currentRole];
    return role ? role.description : "";
  },

  // 获取存活玩家列表
  getAlivePlayers() {
    return this.data.players.filter((player) => player.alive);
  },

  // 获取可查验玩家列表
  getCheckablePlayers() {
    return this.data.players.filter(
      (player) =>
        player.alive && !this.data.checkedPlayers.includes(player.seatNumber),
    );
  },

  // 获取可守护玩家列表
  getGuardablePlayers() {
    return this.data.players.filter(
      (player) =>
        player.alive && player.seatNumber !== this.data.lastGuardedPlayer,
    );
  },

  // 选择目标
  selectTarget(e) {
    const seatNumber = e.currentTarget.dataset.seat;
    this.setData({
      selectedTarget: seatNumber,
    });
  },

  // 选择毒药目标
  selectPoisonTarget(e) {
    const seatNumber = e.currentTarget.dataset.seat;
    this.setData({
      selectedPoisonTarget: seatNumber,
    });
  },

  // 选择查验目标
  selectCheckTarget(e) {
    const seatNumber = e.currentTarget.dataset.seat;
    this.setData({
      selectedCheckTarget: seatNumber,
    });
  },

  // 选择守护目标
  selectGuardTarget(e) {
    const seatNumber = e.currentTarget.dataset.seat;
    if (seatNumber !== this.data.lastGuardedPlayer) {
      this.setData({
        selectedGuardTarget: seatNumber,
      });
    }
  },

  // 使用解药
  useSavePotion() {
    this.setData({
      hasSavePotion: false,
      usedSavePotion: true,
      showDeathInfo: false,
    });
  },

  // 跳过使用解药
  skipSavePotion() {
    this.setData({
      usedSavePotion: true,
      showDeathInfo: false,
    });
  },

  // 确认行动
  confirmAction() {
    switch (this.data.currentRole) {
      case "werewolf":
        this.handleWerewolfAction();
        break;
      case "witch":
        this.handleWitchAction();
        break;
      case "seer":
        this.handleSeerAction();
        break;
      case "guard":
        this.handleGuardAction();
        break;
    }
    this.moveToNextRole();
  },

  // 跳过行动
  skipAction() {
    this.moveToNextRole();
  },

  // 处理狼人行动
  handleWerewolfAction() {
    if (this.data.selectedTarget) {
      this.setData({
        killedPlayer: this.data.selectedTarget,
      });
    }
  },

  // 处理女巫行动
  handleWitchAction() {
    if (this.data.selectedPoisonTarget && this.data.hasPoisionPotion) {
      this.setData({
        hasPoisionPotion: false,
      });
    }
  },

  // 处理预言家行动
  handleSeerAction() {
    if (this.data.selectedCheckTarget) {
      const checkedPlayers = [
        ...this.data.checkedPlayers,
        this.data.selectedCheckTarget,
      ];
      this.setData({
        checkedPlayers,
      });

      const targetPlayer = this.data.players.find(
        (p) => p.seatNumber === this.data.selectedCheckTarget,
      );
      if (targetPlayer) {
        const isWerewolf = targetPlayer.role === "werewolf";
        wx.showModal({
          title: "查验结果",
          content: `${targetPlayer.name} 是${isWerewolf ? "狼人" : "好人"}`,
          showCancel: false,
        });
      }
    }
  },

  // 处理守卫行动
  handleGuardAction() {
    if (this.data.selectedGuardTarget) {
      this.setData({
        lastGuardedPlayer: this.data.selectedGuardTarget,
      });
    }
  },

  // 移动到下一个角色
  moveToNextRole() {
    const nextRoleIndex = this.data.currentRoleIndex + 1;

    if (nextRoleIndex >= this.data.roleOrder.length) {
      this.endNight();
    } else {
      this.setData({
        currentRoleIndex: nextRoleIndex,
        currentRole: this.data.roleOrder[nextRoleIndex],
      });
      this.resetActionState();
    }
  },

  // 重置行动状态
  resetActionState() {
    this.setData({
      selectedTarget: null,
      selectedPoisonTarget: null,
      selectedCheckTarget: null,
      selectedGuardTarget: null,
      showDeathInfo:
        this.data.currentRole === "witch" && this.data.killedPlayer !== null,
    });
  },

  // 结束夜晚
  endNight() {
    wx.navigateTo({
      url: "/pages/Speech/index",
    });
  },

  onLoad() {
    this.resetActionState();
  },
});
