App({

  globalData: {
    userInfo: null,
    UID: null,
    query_result: null,
    password: null,
    openid: null,
    token: false,
    username: null,
    user_avatar: null,
  },

  onLaunch() {

    wx.cloud.init({
      env: "xxxxxxxx"
    })

    var that = this;
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log(res)
        that.globalData.openid = res.result.openid

        wx.cloud.database().collection('login_users').where({
          _openid: res.result.openid
        }).get({
          success: function (result) {
            console.log(result)
            that.globalData.query_result = result
            console.log(that.globalData.query_result)
            that.globalData.userInfo = result.data[0]
            console.log(that.globalData.userInfo)
            that.globalData.UID = result.data[0].UID
            console.log(that.globalData.UID)
          },
          fail: function (result) {
            console.log(result)
          }
        })
      }
    })
  }
})
