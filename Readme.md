# shadow-tracker（中文） - 一款轻量级的前端无感知监控插件

## 1、介绍

shadow-tracker 是一款轻量级的前端无感知监控插件，它提供的功能有：

| 序号 | 功能                                                                                 | 对应日志类型                   |
| ---- | ------------------------------------------------------------------------------------ | ------------------------------ |
| 1    | 收集用户与网页交互时的点击、键盘输入事件                                             | 事件日志（Event Log）          |
| 2    | 收集所有 JS 的错误信息                                                               | 错误日志（Error Log）          |
| 3    | 收集所有 XMLHTTPRequest 网络请求信息                                                 | 请求日志（XMLHttpRequest Log） |
| 4    | 收集页面加载的性能数据信息                                                           | 性能日志（Performance Log）  |
| 5    | 收集用户的设备信息                                                                   | 设备日志（Device Log）         |
| 6    | 提供时间旅行功能，可根据用户的操作生成 NightWatch e2e 测试代码，复现用户的每一步操作 | 无                             |
| 7    | 支持对日志的自定义拓展                                                               | 无                             |

备注：“页面的性能数据信息”日志功能支持 IE9 及以上浏览器，其他日志功能均支持 IE7 及以上浏览器。

## 2、使用方法

### 2-1、通过 npm 引入

```bash
npm install shadow-tracker
```

```javascript
// 使用import引入tracker即可访问tracker的API
// 这里只呈现了“初始化tracker”以及“获取日志信息”的代码，其他API使用请参照第三部分“API说明”

import tracker from 'shadow-tracker'

tracker.init() // 初始化tracker
console.log(tracker.getLogList()) // 获取日志信息
```

### 2-2、通过`<script>`标签引入

```html
<script src="http://www.shadowingszy.top/ShadowTracker/script/shadow-tracker-script.js"></script>
<script>
  // 引入之后tracker对象就会挂到window对象下，使用window.tracker即可访问tracker的API
  // 这里只呈现了“初始化tracker”以及“获取日志信息”的代码，其他API使用请参照第三部分“API说明”

  window.tracker.init() // 初始化tracker
  console.log(window.tracker.getLogList()) // 获取日志信息
</script>
```
注：由于服务器资源有限，建议先从`"http://www.shadowingszy.top/ShadowTracker/script/shadow-tracker-script.js"`这里下载shadow-tracker脚本文件。

## 3、API 说明

### 3-1、init(options)

初始化 tracker

参数说明：
options - 传入一个配置项对象，详见第四部分“配置项说明”

使用样例：

```javascript
tracker.init({})
```

### 3-2、getDeviceInfo()

获取用户设备信息并将设备信息写入 logList 中，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getDeviceInfo())
```

### 3-3、getPerformanceInfo()

获取页面性能数据并将页面性能信息写入 logList 中，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getPerformanceInfo())
```

### 3-4、getLogList()

获取日志数据，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getLogList())
```

### 3-5、getTimeTravelCode()

获取时间旅行代码，详见第六部分“时间旅行功能”

使用样例：

```javascript
console.log(tracker.getTimeTravelCode())
```

## 4、配置项说明

在初始化 tracker 时，可传入配置项来丰富 tracker 的功能。

```javascript
// 这是shadow-tracker的默认配置项，我们以此为例
const option = {
  useClass: false, // 是否使用class作为元素的唯一ID
  maxResponseTextLength: 1000, // 记录XMLHttpRequest返回值的最大长度
  timeTracelInitTime: 3000, // 生成的时间旅行代码中，初始化页面的等待时间
  timeTravelClickDelayTime: 1000, // 生成的时间旅行代码中，点击元素的延迟时间
  timeTracelInputDelayTime: 1000, // 生成的时间旅行代码中，输入数据的延迟时间
  custom: false, // 是否在日志对象中加入自定义数据
  customizeLog: (logType, logContent) => {}, // 生成自定义log数据的函数，详见第五部分“logList 说明及自定义 Log”
  customizeEventLog: (event) => {}, // 生成自定义event log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeErrorLog: (error) => {}, // 生成自定义error log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeXMLHttpRequestLog: (event) => {}, // 生成自定义XMLHttpRequest log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeDeviceLog: (userAgent) => {}, // 生成自定义device log的函数，详见第五部分“logList 说明及自定义 Log”
  customizePerformanceLog: (performance) => {} // 生成自定义performance log的函数，详见第五部分“logList 说明及自定义 Log”
}
```

## 5、logList 说明及自定义 Log

logList 是存储全部日志的 js 数组，我们可以使用`getLogList()`来获取到这个数组，并针对自己的业务需求进一步开发日志上报、日志储存等逻辑。
另外，我们还可以根据自己的业务需求，对日志对象进行拓展。

如果我们需要添加自定义数据，首先我们需要把传入 tracker 的配置项对象中的`custom`属性赋值为 true，并根据自己的需求实现自定义数据函数。

### 5-1、Log 对象说明

#### 5-1-1、基础说明

Log 对象是基础的日志对象，它包含如下属性：

```javascript
{
  "logTime": 1584262658187, // 日志产生的时间
  "url": "www.shadowingszy.top", // 产生日志页面的url
  "logType": "Error Log", // 日志的种类，包含：Event Log | Error Log | XMLHttPRequest Log | Device Log | Performance Log 五种
  "logContent": {} // 日志的具体信息
}
```

#### 5-1-2、自定义说明

自定义 Log 对象包含如下属性：

```javascript
{
  "logTime": 1584262658187, // 日志产生的时间
  "url": "www.shadowingszy.top", // 产生日志页面的url
  "logType": "Error Log", // 日志的种类，包含：Event Log | Error Log | XMLHttPRequest Log | Device Log | Performance Log 五种
  "logContent": {} // 日志的具体信息
  "custom":{ // 自定义日志字段
    "log": {}, // 执行配置项中的customizeLog()方法后返回的值
    "detail": {} // 某一类日志在执行配置项中的对应的customizeEventLog()、customizeErrorLog()、customizeXMLHttpRequestLog()、customizeDeviceLog()、customizePerformanceLog()方法后返回的值
  }
}
```

通过实现配置项中的`customizeLog`方法，我们可以自定义日志对象，并将`customizeLog`函数的返回值作为 Log 对象中`custom.log`属性的值。

`customizeLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| logType | string | 日志的种类，包含：`Event Log | Error Log | XMLHttPRequest Log | Device Log | Performance Log` 五种
| logContent | object | 日志具体信息，即 Log 对象中的`logContent`属性的值

### 5-2、Event Log 对象说明

#### 5-2-1、基础说明

Event Log 对象是记录用户点击、输入事件的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
Event Log 包含“点击”和“输入”两种日志类型，分别包含如下属性：

点击事件：

```javascript
{
  "domPath": "h1", // 当前事件的dom路径
  "trackingType": "mousedown", // 事件类别
  "offsetX": "0.5", // 当前点击事件的相对x坐标，如当前页面宽度是700，那么点击事件的x为350
  "offsetY": "0.5" // 当前点击事件的相对x坐标，如当前页面宽度是700，那么点击事件的y为350
}
```

输入事件：

```javascript
{
  "domPath": "h1", // 当前事件的dom路径
  "trackingType": "keyup", // 事件类别
  "inputKey": "3", // 输入的值
  "currentValue": "123" // 当前输入框的值
}
```

#### 5-2-2、自定义说明

通过实现配置项中的`customizeEventLog`方法，我们可以自定义日志对象，并将`customizeEventLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeEventLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| event | object | 当前触发事件的 event 对象

### 5-3、Error Log 对象说明

#### 5-3-1、基础说明

Error Log 对象是记录当前页面发生的 js 错误的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
Error Log 对象包含如下属性：

```javascript
{
  "errorType": "customize", // error的类型，包含：js | customize | window.onerror | window.onunhandledrejection 四种
  "errorMsg": "This is error message", // 报错信息
  "lineNumber": 0, // 出错位置所在行数
  "columnNumber": 0 // 出错位置所在列数
}
```

注：errorType 详细说明
| 种类 | 说明
| - | - |
| js | javascript 代码报错 |
| customize | console.error()报错，此种错误不包含错误堆栈信息 |
| window.onerror | window.onerror 回调报错 |
| window.onunhandledrejection | window.onunhandledrejection 回调报错 |

#### 5-3-2、自定义说明

通过实现配置项中的`customizeErrorLog`方法，我们可以自定义日志对象，并将`customizeErrorLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeErrorLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| error | object | 触发错误的 error 对象

### 5-4、XMLHttPRequest Log 对象说明

#### 5-4-1、基础说明

XMLHttPRequest Log 对象是记录 XMLHttpRequest 的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
XMLHttPRequest Log 包含“请求开始”和“请求结束”两种日志类型，分别包含如下属性：

请求开始：

```javascript
{
  "event": "ajaxLoadStart" // 当前事件
}
```

请求结束：

```javascript
{
  "event": "ajaxLoadEnd", // 当前事件
  "status": 200, // 状态码
  "response": "" // 返回内容
}
```

#### 5-4-2、自定义说明

通过实现配置项中的`customizeXMLHttpRequestLog`方法，我们可以自定义日志对象，并将`customizeXMLHttpRequestLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeXMLHttpRequestLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| event | object | 触发`ajaxLoadStart`或`ajaxLoadEnd`的事件

### 5-5、Device Log 对象说明

#### 5-5-1、基础说明

Device Log 对象是记录用户设备信息的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中，包含如下属性：

```javascript
{
  "browser": true, // 是否为PC端浏览器
  "mobile": false, // 是否为手机端浏览器
  "type": "computer", // 当前终端的类别，包含：computer, ios, android, wechat, windows phone, unknow
  "version": "80.0.3987.132", // 版本号
  "name": "chrome", // 当前浏览器的类别，包含：msie, firefox, chrome, sarfari, android, ios, unknown
  "userAgent": "" // navigator.userAgent的值
}
```

#### 5-5-2、自定义说明

通过实现配置项中的`customizeDeviceLog`方法，我们可以自定义日志对象，并将`customizeDeviceLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeDeviceLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| device | object | `navigator.userAgent`对象

### 5-6、Performance Log 对象说明

#### 5-6-1、基础说明

Performance Log 对象是记录页面性能数据的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中，包含如下属性：

```javascript
{
  "loadType": "reload",
  "loadPageTime": 0, // 页面加载完成的时间
  "domReadyTime": 0, // 解析 DOM 树结构的时间
  "redirectTime": 0, // 重定向的时间
  "domainLookupTime": 0, // DNS 查询时间
  "timeToFirstByte": 0, // 读取页面第一个字节的时间，即用户拿到你的资源占用的时间
  "requestTime": 0, // 内容加载完成的时间
  "loadEventTime": 0, // 执行 onload 回调函数的时间
  "cacheTime": 0, // DNS 缓存时间
  "unloadTime": 0, // 卸载页面的时间
  "connectTime": 0 // TCP 建立连接完成握手的时间
}
```

注：Performance Log 对象使用`window.performance`来记录页面性能数据，因此只支持 IE9 及以上浏览器

#### 5-6-2、自定义说明

通过实现配置项中的`customizePerformanceLog`方法，我们可以自定义日志对象，并将`customizePerformanceLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizePerformanceLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| performance | object | `window.performance`对象

## 6、时间旅行功能

本功能会根据 logList 中的 Event Log 数据来复现用户的全部操作，并根据日志生成 NightWatch e2e 测试代码，我们只需要安装 NightWatch 并执行这部分代码，便可复现出用户的操作。

我们可以在 tacker 的配置项中进行参数设置。
| 参数名 | 参数说明
| - | - |
| timeTracelInitTime | 生成的时间旅行代码中，初始化页面的等待时间 |
| timeTravelClickDelayTime | 生成的时间旅行代码中，点击元素的延迟时间 |
| timeTracelInputDelayTime | 生成的时间旅行代码中，输入数据的延迟时间 |

生成代码示例：

```javascript
function test(browser) {
  browser
    .url('www.shadowingszy.top')
    .pause(3000)
    .assert.elementPresent('#xml-test')
    .click('#xml-test')
    .pause(2000)
    .assert.elementPresent('#get-log')
    .click('#get-log')
    .pause(2000)
    .assert.elementPresent('#get-log')
    .click('#get-log')
    .pause(1000)
}
```


# shadow-tracker(English)

## 1 shadow-tracker introduction

shadow-tracker is a sensorless front-end data tracker, which provides the following functions:

| number | function                                                                                      | log type           |
| ------ | --------------------------------------------------------------------------------------------- | ------------------ |
| 1      | Collect the click and keyboard input events when the user interacts with the web page         | Event Log          |
| 2      | Collect error information for all JS                                                          | Error Log          |
| 3      | Collect all XMLHttpRequest network request information                                        | XMLHttpRequest Log |
| 4      | Collect performance data information of page loading                                          | performance log    |
| 5      | Collect the user's device information                                                         | device log         |
| 6      | provide time travel function, generate nightwatch E2E test code according to user's operation | N/A                |
| 7      | support custom expansion of logs                                                              | N/A                |

Note: `performance data information of page loading` supports IE9 and above browsers, and other functions support IE7 and above browsers.

## 2 quick start

### 2-1 import through NPM

```bash
npm install shadow-tracker
```

```javascript
import tracker from 'shadow-tracker'

Tracker.Init() // initialize tracker
Console.Log(tracker.Getloglist()) // get log information
```

### 2-2 import through the "script" tag

```html
<script src="./shadow-tracker-script.js"></script>
<script>
  Window.Tracker.Init() // initialize tracker
  Console.Log(window.Tracker.Getloglist()) // get the log information
</script>
```

Note: due to the limited server resources, it is recommended to download the shadow-tracker script file from `"http://www.shadowtracker.top/shadowtracker/script/shadow-tracker-script.js"`.

## 3 API description

### 3-1 init(options)

Initialize tracker

Parameter Description:
Options - configuration item object, see part 4 "options"

Use example:

```javascript
tracker.init({})
```

### 3-2 getDeviceInfo()

Get user's device information and write the device information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getDeviceInfo())
```

### 3-3 getPerformanceInfo()

Get the page performance data and write the page performance information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getPerformanceInfo())
```

### 3-4 getLogList()

Get all log data. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getLogList())
```

### 3-5 getTimeTravelCode()

Get the time travel code. For details, see part 6 "time travel"

Use example:

```javascript
console.log(tracker.getTimeTravelCode())
```

## 4 Options

When initialize tracker, a configuration object can be passed in to enrich the functionality of the tracker.

```javascript
//This is the default configuration item for shadow-tracker, let's take this example
const option = {
  useClass: false, //whether to use class as the unique ID of the element
  maxResponseTextLength: 1000, //maximum length of XMLHttpRequest return value
  timeTracelInitTime: 3000, //wait time for initialization page in generated time travel code
  timeTravelClickDelayTime: 1000, //delay time of clicking element in generated time travel code
  timeTracelInputDelayTime: 1000, //delay time of input data in generated time travel code
  custom: false, //whether to add custom data to the log object
  customizeLog: (logType, logContent) => {}, //functions that generate custom log data, see part 5 "LogList description and custom Log"
  customizeEventLog: (event) => {}, //Functions to generate custom event logs, see part 5 "LogList description and custom logs"
  customizeErrorLog: (error) => {}, //Functions to generate custom error logs, see part 5 "LogList description and custom logs"
  customizeXMLHttpRequestLog: (event) => {}, //Functions to generate custom XMLHttpRequest logs, see part 5 "LogList description and custom logs"
  customizeDeviceLog: (userAgent) => {}, //Functions to generate custom device logs, see part 5 "LogList description and custom logs"
  customizePerformanceLog: (performance) => {} //Functions to generate custom performance logs, see part 5 "LogList description and custom logs"
}
```

## 5 Loglist description and custom log

Loglist is a JS array for storing all logs. We can use `getloglist()` to get this array, and further develop the logic of log reporting and log storage according to our business needs.
In addition, we can expand the log object according to our own business requirements.

If we need to add custom data, first we need to assign the `custom` attribute in the configuration item object passed in to the tracker to true, and implement the custom data function according to our own needs.

### 5-1 Log object description

#### 5-1-1 Basic description

The log object is the basic log object, which contains the following properties:

```javascript
{
  "logtime": 1584262658187, // log generation time
  "url": "www.shadowingszy.top", // the URL that generates the log page
  "logType": "Error Log", // the types of logs, including: event log | error log | XMLHttpRequest log | device log | performance log
  "logContent": {} // specific log information
}
```

#### 5-1-2 Custom description

The custom log object contains the following properties:

```javascript
{
  "Logtime": 1584262658187, // log generation time
  "URL": "www.shadowingszy. Top", // the URL that generates the log page
  "Logtype": "error log", // the types of logs, including: event log | error log | XMLHttpRequest log | device log | performance log
  "Logcontent": {} // specific log information
  "Custom": {// custom log fields
    "Log": {}, // the value returned after executing the customizelog() method in the configuration item
    "Detail": {} // the value returned by a type of log after executing the corresponding customizeeventlog(), customizeerrorlog(), customizexmlhttprequestlog(), customizedevicelog(), customizeperformancelog() methods in the configuration item
  }
}
```

By implementing the 'customizelog' method in the configuration item, we can customize the log object and use the return value of the 'customizelog' function as the value of the 'custom. Log' attribute in the log object.

`Customizelog`method parameter description:
|parameter name | parameter type | parameter description|
| - | - | - |
|logType | string | the type of log, including:`event log | error log | XMLHttpRequest log | device log | performance log`
|logContent | object | log specific information|

### 5-2 Description of event log object

#### 5-2-1 Basic description

The event log object is a log object that records user clicks and enters events. It will be displayed in the `logContent` property of the corresponding type of log object.
Event log includes two types of log: "click" and "input", respectively including the following attributes:

Click event:

```javascript
{
"dompPath": "H1", // the DOM path of the current event
"trackingType": "MouseDown", // event
"offsetX": "0.5", // the relative X coordinate of the current click event. If the current page width is 700, then the X of the click event is 350
"offsetY": "0.5" // the relative X coordinate of the current click event. If the current page width is 700, then the y of the click event is 350
}
```

Enter event:

```javascript
{
'domPath': 'H1', // the DOM path of the current event
"trackingType": "Keyup", // event
"inputKey": "3", // the entered value
"currentValue": "123" // the value of the current input box
}
```

#### 5-2-2 Custom description

By implementing the `customizeEventLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeEventLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeEventLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|event | object | the event object that currently triggers the event

### 5-3 Error log object description

#### 5-3-1 Basic description

Error log object is a log object that records JS errors on the current page. It will be displayed in the `logContent` property of the corresponding type of log object.
The error log object contains the following properties:

```javascript
{
"Errortype": "Customize", // the type of error, including: JS | customize | window.onerror | window.onunhandledrection
"Errormsg": "this is error message", // error message
"Linenumber": 0, // the number of lines in the error location
"Columnnumber": 0 // the number of columns where the error occurred
}
```

Note: errorType details
|type | Description |
| - | - |
|js | JavaScript code error|
|customize | `console. Error()` reports an error, which does not contain error stack information|
|window.onerror | `window.onerror` callback error|
|window.onunhandledrejection | `window.onunhandledrejection` callback reports an error|

#### 5-3-2 customize description

By implementing the `customizeErrorLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeErrorLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeErrorLog` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|error | object | the error object that triggered the error

### 5-4 XMLHttpRequest log object description

#### 5-4-1 Basic description

XMLHttpRequest log object is a log object that records XMLHttpRequest. It will be displayed in the `logContent` attribute of the corresponding type of log object.
XMLHttpRequest log contains two types of log: "request start" and "request end", respectively including the following attributes:

Request start:

```javascript
{
"Event": "ajaxloadstart" // current event
}
```

Request end:

```javascript
{
"Event": "ajaxloadend", // current event
"Status": 200, // status code
"Response": "" // return content
}
```

#### 5-4-2 customize description

By implementing the `customizeXMLHttpRequestlog()` method in the configuration item, we can customize the log object and use the return value of the `customizeXMLHttpRequestlog()` function as the value of the `custom.detail` attribute in the log object.

`customizeXMLHttpRequestlog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|event | object | event triggering 'ajaxloadstart' or 'ajaxloadend'

### 5-5 Device log object description

#### 5-5-1 Basic description

The device log object is a log object that records user device information. It will be displayed in the `logContent` property of the corresponding type of log object, including the following properties:

```javascript
{
"Browser": true, // whether it is a PC browser
"Mobile": false, // is the mobile browser
"Type": "computer", // the category of the current terminal, including: computer, IOS, Android, wechat, Windows Phone, unknown
"Version": "80.0.3987.132", // version number
"Name": "Chrome", // the category of the current browser, including: MSIE, Firefox, chrome, sarfari, Android, IOS, unknown
"Useragent": "" // value of navigator.useragent
}
```

#### 5-5-2 customize description

By implementing the `customizeDeviceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizeDeviceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeDeviceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|device | object | `navigator.useragent` object

### 5-6 Description of performance log object

#### 5-6-1 Basic instructions

The performance log object is a log object that records page performance data. It will be displayed in the `logContent` property of the corresponding type of log object, including the following properties:

```javascript
{
"loadType": "reload",
"Loadpagetime": 0, // the time when the page loading is completed
"Domreadytime": 0, // time to parse DOM tree structure
"Redirecttime": 0, // redirection time
"Domainlookuptime": 0, // DNS query time
"Timetofirstbyte": 0, // the time taken to read the first byte of the page, that is, the time taken by the user to get your resources
"Requesttime": 0, // time when content loading is completed
"Loadeventtime": 0, // the time when the onload callback function is executed
"Cachetime": 0, // DNS cache time
"Unloadtime": 0, // time to unload the page
"Connecttime": 0 // the time for TCP to establish the connection and complete the handshake
}
```

Note: the performance log object uses `window.performance` to record page performance data, so only IE9 and above browsers are supported

#### 5-6-2 User defined description

By implementing the `customizePerformanceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizePerformanceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizePerformanceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|performance | object | `window.performance` object

## 6 Time Travel feature

This feature reproduces all user actions based on Event Log data in the logList and generates NightWatch E2E test code from the logs. We only need to install NightWatch and execute this code to reproduce user actions.

We can set parameters in the tacker configuration item.
|Parameter Name|Parameter Description
| - | - |
| timeTracelInitTime | Initialize page wait time in generated time travel code|
| timeTravelClickDelayTime | Delay time of click on the element in generated time travel code |
| timeTracelInputDelayTime | Delay time of input data in generated time travel code|

Generate code examples:

```javascript
Function test (browser) {
  Browser
    .url ('www.shadowingszy.top')
    .pause (3000)
    .assert.elementPresent ('#xml-test')
    .click ('#xml-test')
    .pause (2000)
    .assert.elementPresent ('#get-log')
    .click ('#get-log')
    .pause (2000)
    .assert.elementPresent ('#get-log')
    .click ('#get-log')
    .pause (1000)
}
```
