App({
  show: function(that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms 
      duration: 800,
      timingFunction: 'ease',
    }); //var animation = this.animation
    animation.opacity(opacity).step() //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export() //设置动画
    that.setData(json)
  },
  
  //滑动渐入渐出
  slideupshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step() //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  
   //向右滑动渐入渐出
  sliderightshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画 that.setData(json) 
  },

  onLaunch() {
    console.log('App.onLaunch()');
  },
  onShow: function() {},
  onHide: function() {},

  //本应用全局数据
  globalData: {
    temperature: {},
    light: {},
    humidity: {}
  }
})