const app = getApp()
const db = wx.cloud.database()
var backup = ''

Page({

  data: {
    UID: null,
    password: null,
  },

  onLoad: function (options) {

  },

  UIDInput: function (e) {
    this.data.UID = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },

  login: function () {
    var that = this
    db.collection('login_users').where({
      UID: that.data.UID,
      password: that.data.password,
    }).get({
      success (res) {
        backup = res.data
      }
    })

    if(backup == []) {
      wx.showModal({
        title: "Uh-oh...",
        content: "Check your UID and password",
        showCancel: false,
        confirmText: "Confirm",
        confirmColor: "#000000",
      })
    } else {
      wx.switchTab({
        url: '/pages/my/my',
      })
    }
  },
  

  registration_portal() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  retrieve_portal() {
    wx.navigateTo({
      url: '/pages/retrieve/retrieve',
    })
  }

})