const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    postid: '',
    comment: '',
    comment_value: '',
  },

  onLoad: function (options) {
    console.log(options.postid)
    this.setData({
      postid: options.postid
    })

    wx.cloud.init({
      env: "cloud-1-1gb5xxxp9f134365"
    })
  },

  input: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },

  sendComment: function () {
    console.log('Triggered')
    var that = this;
    if (that.data.comment.length < 1) {
      wx.showModal({
        showCancel: false,
        title: "Hey...",
        content: "Say something at least",
        confirmText: "Sure",
        confirmColor: "#000000",
      })
    } else {
      wx.showLoading({
        title: 'Posting...',
      })

      db.collection('comment_collection').add({
        data: {
          postid: that.data.postid,
          openid: app.globalData.openid,
          name: app.globalData.username,
          avatarUrl: app.globalData.user_avatar,
          content: that.data.comment,
          time: new Date(),
        },
        success: function (res) {
          that.setData({
            comment_value: '',
          })

          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]
          prevPage.setData({
            update: true,
            postid: that.data.postid
          })
          wx.hideLoading()
          wx.navigateBack({
            url: '../post_detail/post_detail'
          })
        }
      })
    }
  },

  join_table: function() {
    var that = this
    var query = null

    db.collection('post_collection').where({
      _id: that.data.postid
    }).get({
      success: function(res) {
        console.log(res)
        query = res.data[0].ontable

        if (query.includes(app.globalData.openid)) {
          wx.navigateTo({
            url: '../table/table?postid=' + that.data.postid,
          })
        } else {
          wx.showModal({
            cancelColor: '#bbbcbd',
            confirmColor: '#000000',
            confirmText: 'I' + "'" + 'm in',
            cancelText: 'Cancel',
            title: 'Your contact information',
            editable: true,
            placeholderText: 'Wechat ID/Email/TEL',
            success(res) {
              if (res.confirm) {
                console.log(res)
                let avatar = app.globalData.user_avatar
                let username = app.globalData.username
                let contact = res.content
                if (contact.length < 4) {
                  wx.showModal({
                    showCancel: false,
                    confirmColor: '#000000',
                    confirmText: 'Confirm',
                    title: 'Please notice that...',
                    content: 'Your information is needed to proceed',
                  })
                } else {
                  let userinfo_set = {
                    user_avatar: avatar,
                    username: username,
                    contact: contact,
                  }

                  db.collection('post_collection').where({
                    _openid: app.globalData.openid,
                    _id: that.data.postid,
                  }).update({
                    data: {
                      ontable: db.command.push(app.globalData.openid),
                      tableuser_info: db.command.push(userinfo_set)
                    },
                    success: function (result) {
                      console.log(result)
                      wx.navigateTo({
                        url: '../table/table?postid=' + that.data.postid,
                      })
                    }
                  })

                }
              }
            }
          })
        }
      }
    })
  }
})