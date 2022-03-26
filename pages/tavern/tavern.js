const app = getApp()
const util = require("../../utils/utils.js");
var num_limit = 0;

Page({
    data: {
        postlist: null,
        userInfo: {},
        update: false,
    },

    refresh: function() {
        var that = this
        num_limit += 10
        console.log(num_limit)
        var post_collected = []
        wx.showLoading({
            title:"Mopping tables"
        })
        wx.cloud.init({env:'cloud-1-1gb5xxxp9f134365'})
        wx.cloud.callFunction({
            name: 'get_post_list',
            success: function(res) {
                var data = res.result.postlist.data
                for (let i = 0; (i < data.length && i < num_limit); i++) {
                    console.log(data[i])
                    post_collected.push(data[i])
                }
                wx.hideLoading()
                that.setData({
                    postlist: post_collected
                })
                wx.stopPullDownRefresh()
            },
            fail: console.error
        })
    },

    onLoad: function (options) {
        wx.startPullDownRefresh({
          success: (res) => {},
        })
        this.refresh()
    },

    onShow: function() {
        var that = this
        console.log("tavern is shown")
        if (this.data.update) {
            wx.startPullDownRefresh()
            this.refresh()
            this.setData({
                update: false
            })
        }
    },

    onItemClick: function(e) {
      console.log(e.currentTarget.dataset.postid)
      wx.navigateTo({
        url:"../post_detail/post_detail?postid=" + e.currentTarget.dataset.postid
      })  
    },

    onPullDownRefresh() {
        this.refresh()
    },

    onReachBottom() {
        this.refresh()
    }
})