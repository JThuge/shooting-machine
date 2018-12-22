// pages/index/index.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    score: "30", //之后写为读取服务器内的成绩的脚本
    time: "60s",
    name: "姓名"
  },

  replay: function(options) {
    wx.navigateTo({
      url: '/start/start'
    })
  },
  gotoend:function(options){
    wx.navigateTo({
      url: '/pages/end/end',
    })
  },
  gotoduring:function(options){
    wx.navigateTo({
      url: '/pages/during/during',
    })
  },
  history: function() {
    //从oneNET请求我们的Wi-Fi气象站的数据（这部分是用于实验网络连接的以后会改为别的东西）
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/503224183/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'H025EXKLn5ZD7YapoISbCSddhpI='
      },
      success: function(res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        console.log(app.globalData.humidity)
        console.log(app.globalData.temperature)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '/pages/history/history',
        })
      },

      fail: function(res) {
        console.log("fail!!!")
      },

      complete: function(res) {
        console.log("end")
      }
    })
  },

  upload: function(options) {

  },
  /*
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  */

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
    this.app.slideupshow(this, 'slide_up1', -200, 1)
    this.app.slideupshow(this, 'appear', 0 ,1)
    setTimeout(function() {
      this.app.slideupshow(this, 'slide_up2', -200, 1)
      
    }.bind(this), 200);
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', -200, 1)

    }.bind(this), 400);
     setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', -200, 1)

    }.bind(this), 600)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.app.slideupshow(this, 'slide_up1', 200, 0) //延时展现容器2，做到瀑布流的效果，见上面预览图 
    setTimeout(function() {
      this.app.slideupshow(this, 'slide_up2', 200, 0)
    }.bind(this), 200);

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