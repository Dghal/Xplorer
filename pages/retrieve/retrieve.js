const app = getApp()
const db = wx.cloud.database()
var backup = ''

Page({
    data: {
        UID: null
    },

    UIDInput: function (e) {
        this.data.UID = e.detail.value
    },

    retrieve: function (options) {
        db.collection('login_users').where({
            UID: this.data.UID
        }).get({
            success: function (res) {
                console.log(res.data)
                backup = res.data
            }
        })
        if (backup.length == 0) {
            wx.showModal({
                title: "Uh-oh...",
                content: 'We could not find your UID',
                showCancel: false,
                confirmText: "Confirm",
                confirmColor: "#000000",
            })
        } if (backup.length != 0) {
            wx.redirectTo({
              url: '/pages/reset/reset',
            })
        }
    }
})