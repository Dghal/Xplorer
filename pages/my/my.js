const app = getApp()

Page({
  
  data: {
    username: app.globalData.username,
    user_avatar: app.globalData.user_avatar
    },

    onLoad: function (options) {
        wx.showToast({
          title: 'Onboard !',
        })
    },

    starred_portal: function() {
      wx.navigateTo({
        url: '../../Messenger/pages/starred',
      })
    },

    tables_portal: function() {
      wx.navigateTo({
        url: '../../Messenger/pages/tables',
      })
    },

    posted_portal: function() {
      wx.navigateTo({
        url: '../../Messenger/pages/posted',
      })
    },
    
    more_portal: function() {
      wx.navigateTo({
        url: '../../Guides/pages/more',
      })
    }
})