var myCharts = require("../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_hum = null
var lineChart_light = null
var lineChart_tempe = null
var raderChart_rader = null
var app = getApp()

Page({
  data: {
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },


  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var humidity = [];
    var light = [];
    var tempe = [];

    var length = app.globalData.light.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.globalData.humidity.datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.humidity.datapoints[i].value);
      light.push(app.globalData.light.datapoints[i].value);
      tempe.push(app.globalData.temperature.datapoints[i].value);
    }
    return {
      categories: categories,
      humidity: humidity,
      light: light,
      tempe: tempe
    }
    console.log(humidity)
  },

  onLoad: function () {
    var wheatherData = this.convert();

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();

    //新建湿度图表
    lineChart_hum = new myCharts({
      canvasId: 'humidity',
      type: 'area',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '总分数',
        data: wheatherData.humidity,
        format: function (val, name) {
          return val.toFixed(2);
        }, 
      },{
        name:'单位时间分数',
          data: wheatherData.tempe,
          format: function (val, name) {
            return val.toFixed(2);
          }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '数量（个）',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 55
      },
      width: windowWidth,
      height: 400,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
    //console.log(weatherData.humidity)

    var length = app.globalData.light.datapoints.length;
    //新建一个数据雷达图      //下面一段都是处理雷达图数据
    var humidity=[];
    var r1 = 30;//平稳
    var r2 = 50;//爆发
    var r3 = 40; //失误
    var r4 = 0 ;//平均
    /*for (var i = 0; i < length; i++){
      categories.push(app.globalData.humidity.datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.humidity.datapoints[i].value);
    }*/
    var weatherData = this.convert();//处理平均数
    for (var i=0; i < length; i++){
      var temp = parseFloat(weatherData.humidity[i]);
      r4 += temp;
      //console.log(weatherData.humidity[i])
    }
    //console.log(r4)
    r4=r4/length;
    //console.log(length)
    //console.log(r4)
    //var weatherData = this.convert();
    var low = parseFloat(weatherData.humidity[1])//处理最低分
    for (var i=0; i < length; i++){
      var temp = parseFloat(weatherData.humidity[i]);
      if(low > temp){
        low = temp
      }
      r3 = low
    }
    var high = parseFloat(weatherData.humidity[1])//处理最高分
    for (var i = 0; i < length; i++) {
      var temp = parseFloat(weatherData.humidity[i]);
      if (high < temp) {
        high = temp
      }
      r2 = high
    }
    
    //var e = 0                //处理方差
    r1=30-r2+r3;
    console.log(r1)
    r4=10;
    r3=0;
    /*
    for (var i = 0; i < length; i++){
      if (r3 > app.globalData.humidity.datapoints[i]){
        r3 = app.globalData.humidity.datapoints[i]
      }
    }
    for (var i = 0; i < length; i++) {
      if (r3 < app.globalData.humidity.datapoints[i]) {
        r3 = app.globalData.humidity.datapoints[i]
      }
    }
    for (var i = 0; i < length; i++){

    }
    */
    raderChart_rader=new myCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['玩家平均度', '最好成绩', '最差成绩', '平均水平'],
      series: [{
        name: '雷达图',
        data: [r1,r2,r3,r4]//还没弄
      }], width: windowWidth, height: 320,
       extra: {
        radar: {
          max: 20
        }
      },
      
    });

/*
    //新建光照强度图表
    lineChart_light = new myCharts({
      canvasId: 'light',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'light',
        data: wheatherData.light,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'light (lux)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 190
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    //新建温度图表
    lineChart_tempe = new myCharts({
      canvasId: 'tempe',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'temperature',
        data: wheatherData.tempe,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: 'temperature (摄氏度)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 24
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });*/
  },


})
