// index.js
Page({
  data: {
    playerCounts: [6, 8, 10, 12],
    selectedPlayerCount: 0,
    roles: [
      {
        id: 1,
        name: "Guard",
        image: "/images/guard.png",
        description: "No special ability.",
        selected: false,
      },
      {
        id: 2,
        name: "Villager",
        image: "/images/villager.png",
        description: "No special ability.",
        selected: false,
      },
      {
        id: 3,
        name: "Hunter",
        image: "/images/hunter.png",
        description: "No special ability.",
        selected: false,
      },
      {
        id: 4,
        name: "Idoit",
        image: "/images/idiot.png",
        description: "No special ability.",
        selected: false,
      },
      {
        id: 5,
        name: "Witch",
        image: "/images/witch.png",
        description: "No special ability.",
        selected: false,
      },
      {
        id: 6,
        name: "Seer",
        image: "/images/witch.png",
        description: "No special ability.",
        selected: false,
      },
      // ...more roles
    ],
    werewolfRole: {
      id: 7,
      name: "Werewolf",
      image: "/images/werewolf.png",
      description: "No special ability.",
      selected: false,
    },
    werewolfCount: 1,
    werewolfRange: [1, 2, 3, 4, 5],
    selectedRoles: [],
    summary: "",
    showResetButton: false,
  },

  onLoad() {
    this.updateRoleSelection();
    this.setData({
      werewolfCount: this.data.werewolfRange[0],
    });
  },

  getWerewolfRole() {
    return this.data.roles.find((role) => role.name === "Werewolf");
  },

  onRoleTap(e) {
    const id = e.currentTarget.dataset.id;
    const disabled = e.currentTarget.dataset.disabled;
    if (disabled) return;
    // Exclude werewolf role from manual selection
    if (id === this.data.werewolfRole.id) return;
    let selected = this.data.selectedRoles.filter((role) => role.id !== id);
    if (selected.length < this.data.selectedPlayerCount) {
      const role = this.data.roles.find((r) => r.id === id);
      if (!this.data.selectedRoles.some((r) => r.id === id)) {
        selected.push({ ...role });
      }
    }

    this.setData({ selectedRoles: selected }, () => {
      this.updateRoleSelection();
    });
  },

  updateRoleSelection() {
    const { roles, selectedRoles } = this.data;
    const updatedRoles = roles.map((role) => ({
      ...role,
      selected: selectedRoles.some((selected) => selected.id === role.id),
    }));
    this.setData({ roles: updatedRoles });
  },

  // request to create room session

  onPlayerCountChange(e) {
    const playerCount = this.data.playerCounts[e.detail.value];
    this.setData({
      selectedPlayerCount: playerCount,
      selectedRoles: [],
    });
  },

  onWerewolfChange(e) {
    const count = this.data.werewolfRange[e.detail.value];
    if (!count) {
      return;
    }
    this.setData({ werewolfCount: count });

    const selectedWerewolfRoleCount = { role: this.data.werewolfRole, count };
    const selectedRolesList = this.updateSelectedRolesList(
      this.data.selectedRoles,
      selectedWerewolfRoleCount,
    );
    this.setData({ selectedRoles: selectedRolesList });
    this.validate();
  },

  validate() {
    const { selectedPlayerCount, selectedRoles } = this.data;
    if (selectedPlayerCount < selectedRoles.length) {
      wx.showToast({
        title: "超过房间人数",
        icon: "none",
      });
      this.setData({ showResetButton: true });
      return false;
    } else {
      this.setData({ showResetButton: false });
    }
    return true;
  },

  onConfirm() {
    this.validate();
    const { selectedPlayerCount, selectedRoles } = this.data;
    if (selectedPlayerCount !== selectedRoles.length) {
      wx.showToast({
        title: "Total does not match player count",
        icon: "none",
      });
      return;
    }
    let summary = `Players: ${selectedPlayerCount}\n`;
    selectedRoles.forEach((role) => {
      summary += `${role.name}\n`;
    });
    this.setData({ summary });
  },

  onReset() {
    this.setData({
      selectedRoles: [],
      werewolfCount: 1,
      "werewolfRole.selected": false,
      summary: "",
    });
    this.updateRoleSelection();
    this.setData({ showResetButton: false });
  },

  updateSelectedRolesList(selectedRoles, werewolfCount) {
    // Remove any existing werewolf role(s)
    const filteredRoles = selectedRoles.filter(
      (role) => role.name !== werewolfCount.role.name,
    );

    // Add the correct number of werewolf roles
    for (let i = 0; i < werewolfCount.count; i++) {
      filteredRoles.push({ ...werewolfCount.role });
    }

    return filteredRoles;
  },
});
