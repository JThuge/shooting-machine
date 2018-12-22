// pages/score/score.js
var app = getApp()
var score
var persent
Page({
  gotohistory:function(options){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },

  data: {
    score,
    persent
  },
  convert:function(){
    //var categoris = [];
    var length = app.globalData.light.datapoints.length
    var humidity = [];
    //categories.push(app.globalData.humidity.datapoints[0].at.slice(11,19));
    for(var i=0;i<=19;i++){
    humidity.push(app.globalData.humidity.datapoints[i].value)
    }
    return{
      //categories:categories,
      humidity:humidity
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var weatherData = this.convert();
    var length = app.globalData.light.datapoints.length;
    var temp = parseFloat(weatherData.humidity[0]);
    console.log(temp);
    var count = 0;
    for (var i = 0; i < length; i++) {
      var element = parseFloat(weatherData.humidity[i]);
      console.log(element);
      if(element<=temp){
        count++;
      }
    }
    var per = (count/length)*100;
    this.setData({
      temp,
      per
    })
    this.app = getApp()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(score)
    this.app = getApp()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.app.slideupshow(this, 'slide_up1', -200, 1)
    this.app.slideupshow(this, 'appear', 0, 1)
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up2', -200, 1)

    }.bind(this), 1000);
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up3', -200, 1)

    }.bind(this), 2000);
    setTimeout(function () {
      this.app.slideupshow(this, 'slide_up4', -200, 1)

    }.bind(this), 3500)
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
    console.log('onPullDownRefresh', new Date())
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