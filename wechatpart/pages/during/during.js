// pages/during/during.js
Page({
  gotoscore: function (options) {
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/503224183/datapoints?datastream_id=Light,Temperature,Humidity&limit=20',
      header: {
        'content-type': 'application/json',
        'api-key': 'H025EXKLn5ZD7YapoISbCSddhpI='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        console.log(app.globalData.humidity)
        console.log(app.globalData.temperature)
        wx.navigateTo({
          url: '/pages/score/score',
        })
      }
    })
  },
  gotoend: function (options) {
    wx.navigateTo({
      url: '/pages/end/end',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.app = getApp()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    setTimeout(function() {
      this.app.slideupshow(this, 'slide_up1', -200, 1)
    }.bind(this), 2000);
    setTimeout(function(){
      this.app.slideupshow(this, 'disappear', -1000, 0)
    }.bind(this), 2000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})