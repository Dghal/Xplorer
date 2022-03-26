const app = getApp()
const db = wx.cloud.database()


Page({

    data: {
        password: null,
        passwordack: null,
        openid: null,
    },

    onLoad: function() {
        this.data.openid = app.globalData.opeid;
    },

    passwordInput: function (e) {
        this.data.password = e.detail.value
    },

    passwordInputack: function (e) {
        this.data.passwordack = e.detail.value
    },

    reset: function () {
        var that = this
        if (that.data.password == '') {
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
        } else {
            db.collection('login_users').where({
                _openid: this.data.openid
            }).update({
                data: {
                    password: this.data.password
                }
                
            })
            
            wx.switchTab({
              url: '/pages/my/my',
            })
        }
    }

})