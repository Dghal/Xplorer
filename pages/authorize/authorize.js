const app = getApp()
const db = wx.cloud.database()

Page({
    data: {
    },

    onLoad: function (options) {
    },


    login() {
        var that = this;
        var generate_avatar = ('//images path' + String(Math.round(Math.random() * 12 + 1)) + '.png')
        wx.getUserProfile({
            desc: '获取用户信息',
            success(res) {
                console.log(res.userInfo)
                var user = res.userInfo

                app.globalData.userInfo = user

                that.setData({
                    userInfo: user
                })

                wx.showLoading({
                    title: 'Loading...',
                })

                wx.cloud.database().collection('login_users').where({
                    _openid: app.globalData.openid
                }).get({
                    success(res) {
                        console.log(res)
                        if (res.data.length == 0) {
                            wx.cloud.database().collection('login_users').add({
                                data: {
                                    nickName: user.nickName,
                                    UID: null,
                                    password: null,
                                    user_avatar: generate_avatar,
                                    starred: [],
                                },
                                success(res) {
                                    console.log(res)
                                    app.globalData.user_avatar = generate_avatar
                                    console.log(app.globalData.user_avatar)
                                }
                            })

                            setTimeout(function () {
                                wx.hideLoading()
                            }, 2000)

                            wx.navigateTo({
                                url: '/pages/login/login',
                            })
                        }
                    }
                })
            }
        })
    },
})
