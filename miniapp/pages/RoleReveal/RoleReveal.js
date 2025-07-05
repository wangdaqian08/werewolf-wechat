// index.js
Page({
  data: {
    cardFlipped: false,
    playerNumber: 5, // 示例座位号
    playerName: '玩家昵称', // 示例玩家名
    role: 'werewolf', // 示例角色
    roles: {
      werewolf: {
        name: '狼人',
        description: '每晚可以杀死一名玩家，目标是消灭所有好人。',
        image: '/static/images/werewolf.png',
      },
      villager: {
        name: '村民',
        description: '没有特殊能力，但可以通过投票放逐狼人。',
        image: '/static/images/villager.png',
      },
      seer: {
        name: '预言家',
        description: '每晚可以查验一名玩家的身份。',
        image: '/static/images/seer.png',
      },
      witch: {
        name: '女巫',
        description: '拥有一瓶解药和一瓶毒药。',
        image: '/static/images/witch.png',
      },
      hunter: {
        name: '猎人',
        description: '被杀时可以开枪带走一名玩家。',
        image: '/static/images/hunter.png',
      },
      guard: {
        name: '守卫',
        description: '每晚可以保护一名玩家不被狼人杀死。',
        image: '/static/images/guard.png',
      },
    },
  },

  // 计算属性转换为方法
  getRoleName() {
    const role = this.data.roles[this.data.role];
    return role ? role.name : '未知角色';
  },

  getRoleDescription() {
    const role = this.data.roles[this.data.role];
    return role ? role.description : '角色描述未知';
  },

  getRoleImageSrc() {
    const role = this.data.roles[this.data.role];
    return role ? role.image : '/static/images/unknown.png';
  },

  // 翻转卡片
  flipCard() {
    this.setData({
      cardFlipped: !this.data.cardFlipped,
    });
  },

  // 确认身份
  confirmRole() {
    if (this.data.cardFlipped) {
      wx.navigateTo({
        url: '/pages/Speech/index',
      });
    }
  },

  onLoad(options) {
    // 从服务器获取玩家的角色信息
    // 这里使用模拟数据
    this.setData({
      playerNumber: options.seatNumber || this.data.playerNumber,
      playerName: options.playerName || this.data.playerName,
      role: options.role || this.data.role,
    });
  },
});
