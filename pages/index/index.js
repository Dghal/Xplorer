const app = getApp()
const db = wx.cloud.database()


Page({
    data: {
    },

    onLoad: function () {
        wx.showLoading({
          title: 'navigating...',
        })

        let openid;
        let a = setInterval(() => {
            if(app.globalData.openid != null){
                openid = app.globalData.openid;
                clearInterval(a)
            }
        },200)

        let b = setInterval(() => {
            if(openid != null) {
                db.collection('login_users').where({
                    _openid: openid
                }).get({
                    success: function (res) {
                        if(res.data.length == 0) {
                            wx.redirectTo({
                              url: '/pages/authorize/authorize',
                            })
                        } else if (res.data[0].UID == null) {
                            app.globalData.userInfo = res.data[0]
                            wx.redirectTo({
                              url: '/pages/login/login',
                            })
                        } else {
                            app.globalData.userInfo = res.data[0]
                            app.globalData.username = res.data[0].username
                            app.globalData.user_avatar = res.data[0].user_avatar
                            wx.switchTab({
                              url: '/pages/my/my',
                            })
                        }
                    }
                })
                clearInterval(b)
            }
        },200)
        
    },

    onUnload: function () {
    }
})