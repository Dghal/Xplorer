// pages/plan/plan.js
Page({
    data: {

    },

    onLoad: function (options) {
      wx.showLoading({
        title: 'Loading...',
      })

      setTimeout(() => {
        wx.hideLoading({
        })
      }, 500);
    },

    hiking_portal: function() {
        wx.navigateTo({
          url: '../../Hiking_routes/pages/hiking_navi',
        })
    },

    ultimate_frisbee_portal: function() {
        wx.navigateTo({
          url: '../../Uf_club/pages/uf_club',
        })
    }
})