const app = getApp()

Page({

    data: {
      word_left: 180,
      content: null,
      additional_content: null,
    },

    onLoad: function (options) {
      wx.cloud.init({
        env: "xxxxxxxx"
      })
    },

    getInputValue: function(e) {
      var value = e.detail.value;
      var word_count = parseInt(value.length);
      this.setData({
        word_left: (String((180 - word_count))),
        content: value
      })
    },

    getaddInputValue: function(e) {
      var value = e.detail.value;
      this.setData({
        additional_content: value
      })
    },

    post_guide_portal: function() {
        wx.navigateTo({
          url: '../../Guides/pages/post_guide',
        })
    },

    publish: function() {
      var that = this
      if (that.data.content.length < 10) {
        wx.showModal({
          title: "Hey...",
          content: "Be brief, but not baffling :)",
          showCancel: false,
          confirmText: "Got it",
          confirmColor: "black"
        })
      } else {
        wx.showLoading({
          title: 'Sending',
        })

        wx.cloud.callFunction({
          name:"publish_post",
          data: {
            openid: app.globalData.openid,
            author_name: app.globalData.username,
            author_avatar: app.globalData.user_avatar,
            content: that.data.content,
            additional_content: that.data.additional_content,
            publish_time: "",
          },
          success:function(res) {
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: 'Sent!',
                })
  
                wx.reLaunch({
                  url: '../tavern/tavern',
                })
              },
            })
          },
          fail: console.error
        })
      }
    },
})
