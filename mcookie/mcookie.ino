#include "OurSpark.h"
#include <Wire.h>
ColorLEDController LEDController1(2, 6);  //实例化一个ColorLEDController对象
#define Light_PIN A2
int sensorValue;
int i=0;
#include "timer.h"
#include <IRremote.h>
int RECV_PIN = 10;          //红外线接收器OUTPUT端接在pin 10
IRrecv irrecv(RECV_PIN);   //定义IRrecv对象来接收红外线信号
decode_results results;   //解码结果放在decode_results构造的对象results里

int zong(0);
int shijian(-1);

Timer t;



//onenet
#define SSID        "lingyang" //改为你的Wi-Fi名称

#define PASSWORD    "18955535835"//Wi-Fi密码

#define HOST_NAME   "api.heclouds.com"

#define DEVICEID    "503221996" //OneNet上的设备ID

#define PROJECTID   "185180" //OneNet上的产品ID

#define HOST_PORT   (80)

String apiKey="gGOvRWry9HvqMHiQteGS0nHMZqw= ";//与你的设备绑定的APIKey



#include <ESP8266.h>

#include <I2Cdev.h>                                //调用库  



/*******光照*******/



#define IDLE_TIMEOUT_MS  3000      // Amount of time to wait (in milliseconds) with no data 

// received before closing the connection.  If you know the server

// you're accessing is quick to respond, you can reduce this value.



//WEBSITE

char buf[10];



#define INTERVAL_sensor 2000

unsigned long sensorlastTime = millis();


int tempOLED, humiOLED, lightnessOLED;



#define INTERVAL_OLED 1000



String mCottenData;

String jsonToSend;



//3,传感器值的设置

int sensor_tem(0),sensor_lux(1);//传感器温度、湿度、光照
float sensor_hum(2.0);
char  sensor_tem_c[7], sensor_hum_c[7], sensor_lux_c[7] ;    //换成char数组传输

#include <SoftwareSerial.h>

#define EspSerial mySerial

#define UARTSPEED  9600

SoftwareSerial mySerial(2, 3); /* RX:D3, TX:D2 */

ESP8266 wifi(&EspSerial);

//ESP8266 wifi(Serial1);                                      //定义一个ESP8266（wifi）的对象

unsigned long net_time1 = millis();                          //数据上传服务器时间

unsigned long sensor_time = millis();                        //传感器采样时间计时器



//int SensorData;                                   //用于存储传感器数据

String postString;                                //用于存储发送数据的字符串

//String jsonToSend;                                //用于存储发送的json格式参数


void setup()
{
  Wire.begin(8);                // 加入i2c总线，设置从机地址为#8
  Wire.onRequest(requestEvent); // 注册主机通知从机上传数据的事件
  Serial.begin(115200);
  irrecv.enableIRIn(); // 启动红外解码 
  t.every(1000, callbackfun);
 

 
}

void loop()
{
  
  //接受红外调时间
  if (irrecv.decode(&results))
  {
     Serial.println(results.value, HEX);
    switch (results.value)
    {
      case 0x1FE807F: shijian = 5;Serial.println(shijian);i=0;zong=30; break; //A
      case 0x1FE40BF: shijian = 60;Serial.println(shijian);i=0;zong=60; break; //B
      case 0x1FEC03F: shijian = 90;Serial.println(shijian);i=0;zong=90; break; //C
    }
    irrecv.resume();  //接收下一个值
  }
  //////////判断计时计数/////////
  
if(shijian>0)
{
  LEDController1.ShowColor(0,255,0,0); //点亮0号灯，让其显示红光
   sensorValue = analogRead(Light_PIN);//光检测
   //计数
   while(sensorValue<800)
   {
    i++; Serial.println(i);
    while(sensorValue<800)
    {
      sensorValue = analogRead(Light_PIN);
      
      delay(10);
      t.update();
     }
}
  t.update();
}
if(shijian==0)
{
  
  shijian=-1;
    Wire.begin();
  
     while (!Serial); // wait for Leonardo enumeration, others continue immediately

  Serial.print(F("setup begin\r\n"));
  WifiInit(EspSerial, UARTSPEED);
  Serial.print(F("FW Version:"));

  Serial.println(wifi.getVersion().c_str());



  if (wifi.setOprToStationSoftAP()) {

    Serial.print(F("to station + softap ok\r\n"));

  } else {

    Serial.print(F("to station + softap err\r\n"));

  }



  if (wifi.joinAP(SSID, PASSWORD)) {

    Serial.print(F("Join AP success\r\n"));



    Serial.print(F("IP:"));

    Serial.println( wifi.getLocalIP().c_str());

  } else {

    Serial.print(F("Join AP failure\r\n"));

  }



  if (wifi.disableMUX()) {

    Serial.print(F("single ok\r\n"));

  } else {

    Serial.print(F("single err\r\n"));

  }



  Serial.print(F("setup end\r\n"));
  updateSensorData(i,zong);
  ///////////上传one net//////////
 
}
if(shijian<0)
;
 
  
}




//////////时间/////////
void callbackfun(void)
{
 if(shijian>0)
  shijian --;
  Serial.println(shijian);
  
}


//////////i2c//////////
void requestEvent() {
  Wire.write(i);
  if(shijian>0)
  Wire.write(shijian);
  else
  Wire.write(0);
}


/////////onenet/////////
void updateSensorData(int i,int zong) {
sensor_tem=i;
  sensor_hum=i/zong*60.0;
  sensor_lux=zong;
  if (wifi.createTCP(HOST_NAME, HOST_PORT)) { //建立TCP连接，如果失败，不能发送该数据

    Serial.print("create tcp ok\r\n");



    jsonToSend = "{\"Temperature\":";

    dtostrf(sensor_tem, 1, 2, buf);

    jsonToSend += "\"" + String(buf) + "\"";

    jsonToSend += ",\"Humidity\":";

    dtostrf(sensor_hum, 1, 2, buf);

    jsonToSend += "\"" + String(buf) + "\"";

    jsonToSend += ",\"Light\":";

    dtostrf(sensor_lux, 1, 2, buf);

    jsonToSend += "\"" + String(buf) + "\"";

    jsonToSend += "}";







    postString = "POST /devices/";

    postString += DEVICEID;

    postString += "/datapoints?type=3 HTTP/1.1";

    postString += "\r\n";

    postString += "api-key:";

    postString += apiKey;

    postString += "\r\n";

    postString += "Host:api.heclouds.com\r\n";

    postString += "Connection:close\r\n";

    postString += "Content-Length:";

    postString += jsonToSend.length();

    postString += "\r\n";

    postString += "\r\n";

    postString += jsonToSend;

    postString += "\r\n";

    postString += "\r\n";

    postString += "\r\n";



    const char *postArray = postString.c_str();                 //将str转化为char数组

    Serial.println(postArray);

    wifi.send((const uint8_t*)postArray, strlen(postArray));    //send发送命令，参数必须是这两种格式，尤其是(const uint8_t*)

    Serial.println("send success");

    if (wifi.releaseTCP()) {                                 //释放TCP连接

      Serial.print("release tcp ok\r\n");

    }

    else {

      Serial.print("release tcp err\r\n");

    }

    postArray = NULL;                                       //清空数组，等待下次传输数据



  } else {

    Serial.print("create tcp err\r\n");

  }

}


