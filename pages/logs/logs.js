// logs.js
const util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      }),
    })

    wx.redirectTo({
      url: '/pages/authorize/authorize',
    })
  }
})