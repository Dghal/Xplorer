const app = getApp()
const db = wx.cloud.database()
const util = require('../../utils/utils')

Page({
    data: {
        postid: null,
        contact_list: null,
        author_avatar: null,
        author_name: null,
        additional_content: null,
        publish_time: null,
        contactinfoLoaded: false,
    },

    onLoad: function (options) {
        var that = this
        that.setData({
            postid: options.postid
        })

        db.collection('post_collection').where({
            _id: that.data.postid
        }).get({
            success: function(res) {
                console.log(res)
                that.setData({
                    contact_list: res.data[0].tableuser_info,
                    author_avatar: res.data[0].author_avatar,
                    author_name: res.data[0].author_name,
                    additional_content: res.data[0].content,
                    publish_time: util.formatTime(new Date(res.data[0].publish_time)),
                    infoLoaded: true,
                })
                console.log(that.data.contact_list)
            }
        })
    },

})