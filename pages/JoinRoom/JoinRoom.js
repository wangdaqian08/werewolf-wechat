
// index.js
Page({
  data: {
    roomNumber: '',
    nickname: '',
    selectedSeat: null,
    occupiedSeats: [], // 已被占用的座位
    hasJoined: false,
    isSitting: false,
    seats: Array.from({length: 12}, (_, i) => ({
      number: i + 1,
      occupied: false
    }))
  },

  // 输入房间号
  onRoomNumberInput(e) {
    this.setData({
      roomNumber: e.detail.value
    })
  },

  // 输入昵称
  onNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 选择座位
  selectSeat(e) {
    const seatNumber = e.currentTarget.dataset.seat
    if (!this.data.occupiedSeats.includes(seatNumber)) {
      this.setData({
        selectedSeat: seatNumber
      })
    }
  },

  // 加入房间
  joinRoom() {
    if (this.data.roomNumber.length === 6 && this.data.nickname.length > 0) {
      this.setData({
        hasJoined: true
      })
      wx.showToast({
        title: '成功加入房间',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 坐下
  sitDown() {
    if (this.data.selectedSeat && !this.data.occupiedSeats.includes(this.data.selectedSeat)) {
      const newOccupiedSeats = [...this.data.occupiedSeats, this.data.selectedSeat]
      this.setData({
        occupiedSeats: newOccupiedSeats,
        isSitting: true
      })
      wx.showToast({
        title: '已成功坐下',
        icon: 'success',
        duration: 2000
      })
    }
  },

  // 站起来
  standUp() {
    if (this.data.isSitting) {
      const newOccupiedSeats = this.data.occupiedSeats.filter(
        seat => seat !== this.data.selectedSeat
      )
      this.setData({
        occupiedSeats: newOccupiedSeats,
        isSitting: false,
        selectedSeat: null
      })
      wx.showToast({
        title: '已站起',
        icon: 'success',
        duration: 2000
      })
    }
  },

  // 检查输入是否有效
  isValidInput() {
    return this.data.roomNumber.length === 6 && this.data.nickname.length > 0
  }
})