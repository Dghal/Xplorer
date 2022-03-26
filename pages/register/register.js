var app = getApp()
var openid = ''
const db = wx.cloud.database()

Page({
    data: {
        username: "",
        UID: "",
        password: "",
        passwordack: "",
        registered: false,
    },

    onLoad: function (e) {
        console.log(app.globalData.openid),
            openid = app.globalData.openid
    },

    usernameInput: function (e) {
        this.data.username = e.detail.value
    },

    UIDInput: function (e) {
        this.data.UID = e.detail.value
    },

    passwordInput: function (e) {
        this.data.password = e.detail.value
    },

    passwordInputack: function (e) {
        this.data.passwordack = e.detail.value
    },

    check_status: function(e) {
        var that = this
        db.collection('login_users').where({
            UID: this.data.UID
        }).get({
            success: function(res) {
                console.log(res)
                let userinfo = res
                if (userinfo != null) {
                    that.setData({
                        registered: true
                    })
                }
            }
        })
    },

    register: function (e) {
        var that = this;
        var UID_test = that.data.UID;
        var reg = new RegExp(/^3035[0-9]{1,6}$/);
        var test_result = reg.test(UID_test);

        this.check_status()

        if (that.data.username == '') {
            wx.showModal({
                title: "Oops!",
                content: 'Username?',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (that.data.UID == '') {
            wx.showModal({
                title: "Uh-oh!",
                content: 'We need your UID for verification purposes.',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (test_result == false) {
            wx.showModal({
                title: "Well...",
                content: 'Seems that your UID is incorrect...',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (that.data.password == '') {
            wx.showModal({
                title: "Oopsy!",
                content: 'Password?',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (that.data.passwordack == '') {
            wx.showModal({
                title: "Umm?",
                content: 'Password confirmation?',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (that.data.password != that.data.passwordack) {
            wx.showModal({
                title: "Whoops-a-daisy!",
                content: 'Check your password confirmation',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else if (that.data.registered == true) {
            wx.showModal({
                title: "Hey...",
                content: 'Use your own UID',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } else {
            db.collection('login_users').where({
                _openid: openid
            }).update({
                data: {
                    username: that.data.username,
                    UID: that.data.UID,
                    password: that.data.password,
                },
                success(res) {
                    app.globalData.username = that.data.username
                    wx.switchTab({
                        url: '/pages/my/my'
                    })
                }
            })
        }
    },

    legal_portal: function () {
        wx.navigateTo({
            url: '/pages/legal/legal',
        })
    }

})