const app = getApp()
const util = require('../../utils/utils')
const db = wx.cloud.database()
var collection = null


Page({
    data: {
        contentLoaded: false,
        commentLoaded: false,
        starLoaded: false,
        detail: {},
        inputBoxShow: true,
        maxContentLength: 50,
        comment: '',
        comments: [],
        postid: '',
        comment_value: '',
        drink: [],
        star: '../images/star.png',
    },

    refreshComment: function (postid) {
        console.log(postid)
        var that = this;
        db.collection('comment_collection').where({
            postid: postid
        }).orderBy('time', 'asce').get({
            success: function (res) {
                console.log(res)
                let commentList = res.data

                for (let i = 0; i < commentList.length; i++) {
                    commentList[i].time = util.formatTime(new Date(commentList[i].time))
                }

                that.setData({
                    comments: commentList,
                    commentLoaded: true,
                })

                let a = setInterval(() => {
                    if ((that.data.commentLoaded && that.data.commentLoaded) != false) {
                        wx.hideLoading()
                        clearInterval(a)
                    }
                }, 200)
            }
        })
    },

    drink: function () {
        var bank = ['Whiskey', 'Vodka', 'Maotai', 'Tequila sunrise', 'Summer punch', 'Erguotou', 'Mojito', 'Mulled gin', 'Corona', 'Pina Colada', 'Cosmopolitan', 'Hurricane', 'Asahi', 'Tsingdao']
        var random = Math.round(Math.random() * 14)
        this.setData({
            drink: bank[random]
        })
    },

    post_comment_portal: function () {
        wx.showLoading({
            title: 'Finding seat',
        })

        wx.navigateTo({
            url: '../post_comment/post_comment?postid=' + this.data.postid
        })

        wx.hideLoading({
            success: (res) => {},
        })
    },

    collectionCheck: function () {
        var that = this
        db.collection('login_users').where({
            _openid: app.globalData.openid
        }).get({
            success: function (results) {
                console.log(results)
                collection = results.data[0].starred
                
                if (collection.includes(that.data.postid)) {
                    that.setData({
                        star: '../images/star_filled.png',
                        starLoaded: true,
                    })
                } else {
                    that.setData({
                        starLoaded: true,
                    })
                }
            }
        })
    },

    onCollectionTap: function () {
        var that = this
        if (that.data.starLoaded) {
            if (that.data.star == '../images/star.png') {
                db.collection('login_users').where({
                    _openid: app.globalData.openid
                }).update({
                    data: {
                        starred: db.command.push(that.data.postid)
                    },
                    success: function () {
                        that.setData({
                            star: '../images/star_filled.png'
                        })
                    }
                })
            } else {
                let collection_removed = util.removeByValue(collection, that.data.postid)
                db.collection('login_users').where({
                    _openid: app.globalData.openid,
                }).update({
                    data: {
                        starred: collection_removed,
                    },
                    success: function () {
                        that.setData({
                            star: '../images/star.png'
                        })
                    }
                })
            }
        }
    },

    onLoad: function (options) {
        wx.showLoading({
            title: 'Bringing drinks',
        })

        this.setData({
            postid: options.postid
        })

        var that = this;

        db.collection('post_collection').where({
            _id: options.postid
        }).get({
            success: function (res) {
                console.log(res)
                var postdetail = res.data[0];
                console.log(postdetail.publish_time)
                postdetail.publish_time = util.formatTime(new Date(postdetail.publish_time))
                that.setData({
                    detail: postdetail,
                    contentLoaded: true,
                })
            }
        })
        this.collectionCheck()
        this.refreshComment(options.postid)
        this.drink()
    },

    onShow: function (options) {
        console.log('Reloading...')
        var that = this
        try {
            if (that.data.update) {
                that.collectionCheck()
                that.refreshComment(that.data.postid)
                that.setData({
                    update: false,
                })
            }
        } catch (e) {
            console.error
        }
    }
})