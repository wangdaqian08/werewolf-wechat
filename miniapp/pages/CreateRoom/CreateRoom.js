// index.js
Page({
  data: {
    playerCounts: [6, 8, 10, 12],
    selectedPlayerCount: 0,
    fixedRoles: [],
    werewolf: { name: "Werewolf", count: 2, min: 1, max: 4 },
    werewolfRange: [1, 2, 3, 4],
    selectedRolesList: [],
    currentTotal: 0,
    summary: "",
  },

  // request to create room session

  onPlayerCountChange(e) {
    const count = this.data.playerCounts[e.detail.value];

    // Example: fixed roles for all counts
    const fixedRoles = [
      { name: "Seer", count: 1 },
      { name: "Witch", count: 1 },
      { name: "Hunter", count: 1 },
    ];

    const werewolf = { ...this.data.werewolf, count: 2 };
    const selectedRolesList = this._getSelectedRolesList(fixedRoles, werewolf);
    const currentTotal = this._getTotal(fixedRoles, werewolf);
    this.setData({
      selectedPlayerCount: count,
      fixedRoles,
      werewolf,
      selectedRolesList,
      currentTotal,
    });
  },

  onWerewolfChange(e) {
    const count = this.data.werewolfRange[e.detail.value];
    const werewolf = { ...this.data.werewolf, count };
    const selectedRolesList = this._getSelectedRolesList(
      this.data.fixedRoles,
      werewolf,
    );
    const currentTotal = this._getTotal(this.data.fixedRoles, werewolf);
    this.setData({
      werewolf,
      selectedRolesList,
      currentTotal,
    });
  },

  onConfirm() {
    const { selectedPlayerCount, selectedRolesList, currentTotal } = this.data;
    if (currentTotal !== selectedPlayerCount) {
      wx.showToast({
        title: "Total does not match player count",
        icon: "none",
      });
      return;
    }
    let summary = `Players: ${selectedPlayerCount}\n`;
    selectedRolesList.forEach((role) => {
      summary += `${role.name}: ${role.count}\n`;
    });
    this.setData({ summary });
  },

  _getSelectedRolesList(fixedRoles, werewolf) {
    const list = [{ name: werewolf.name, count: werewolf.count }];
    fixedRoles.forEach((r) => list.push({ name: r.name, count: r.count }));
    return list;
  },

  _getTotal(fixedRoles, werewolf) {
    let total = werewolf.count;
    total += fixedRoles.reduce((sum, r) => sum + r.count, 0);
    return total;
  },
});
