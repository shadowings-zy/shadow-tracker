# shadow-tracker (English)

## shadow-tracker introduction

shadow-tracker is a sensorless front-end data tracker, which provides the following functions:

| number | function                                                                                                        | log type           |
| ------ | --------------------------------------------------------------------------------------------------------------- | ------------------ |
| 1      | Collect the click events, keyboard input events and url change events when the user interacts with the web page | Event Log          |
| 2      | Collect error information for all JS                                                                            | Error Log          |
| 3      | Collect all XMLHttpRequest network request information                                                          | XMLHttpRequest Log |
| 4      | Collect performance data information of page loading                                                            | performance log    |
| 5      | Collect the user's device information                                                                           | device log         |
| 6      | provide time travel function, generate nightwatch E2E test code according to user's operation                   | N/A                |
| 7      | support custom expansion of logs                                                                                | N/A                |
| 8      | provide log analysis tools                                                                                      | N/A                |

Note: `performance data information of page loading` need browser support `performance API`, and other functions support IE7 and above browsers.

## quick start

### import through NPM

```bash
npm install shadow-tracker
```

```javascript
import tracker from 'shadow-tracker';

Tracker.Init(); // initialize tracker
Console.Log(tracker.Getloglist()); // get log information
```

### import through the "script" tag

```html
<script src="./shadow-tracker-script.js"></script>
<script>
  Window.Tracker.Init(); // initialize tracker
  Console.Log(window.Tracker.Getloglist()); // get the log information
</script>
```

Note: due to the limited server resources, it is recommended to download the shadow-tracker script file from `"http://www.shadowtracker.top/shadowtracker/script/shadow-tracker-script.js"`.

## API description

### init(options)

Initialize tracker

Parameter Description:
Options - configuration item object, see part 4 "options"

Use example:

```javascript
tracker.init({});
```

### getDeviceInfo()

Get user's device information and write the device information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getDeviceInfo());
```

### getPerformanceInfo()

Get the page performance data and write the page performance information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getPerformanceInfo());
```

### getLogList()

Get all log data. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getLogList());
```

### getTimeTravelCode()

Get the time travel code. For details, see part 6 "time travel"

Use example:

```javascript
console.log(tracker.getTimeTravelCode());
```

### addCustomLog(key, value)

add custom log，the `logType` of log object is `Custom Log`

使用样例：

```javascript
tracker.addCustomLog(key, value);
```

## Options

When initialize tracker, a configuration object can be passed in to enrich the functionality of the tracker.

```javascript
//This is the default configuration item for shadow-tracker, let's take this example
const option = {
  sessionId: `${Date.now()}${Math.floor(Math.random() * 1000)}`, // sessionId, default is current timestamp and random number
  userId: `${Date.now()}${Math.floor(Math.random() * 1000)}`, // userId, default is current timestamp and random number
  useClass: false, // whether to use class as the unique ID of the element
  maxResponseTextLength: 1000, // maximum length of XMLHttpRequest return value
  timeTracelInitTime: 3000, // wait time for initialization page in generated time travel code
  timeTravelClickDelayTime: 1000, // delay time of clicking element in generated time travel code
  timeTracelInputDelayTime: 1000, // delay time of input data in generated time travel code
  captureEvent: true, // whether to capture event log
  captureJsError: true, // whether to capture error log
  captureXMLHttpRequest: true, // whether to capture request log
  custom: false, // whether to add custom data to the log object
  customizeLog: function (logType, logContent) {}, // functions that generate custom log data, see part 5 "LogList description and custom Log"
  customizeEventLog: function (event) {}, // functions to generate custom event logs, see part 5 "LogList description and custom logs"
  customizeErrorLog: function (error) {}, // functions to generate custom error logs, see part 5 "LogList description and custom logs"
  customizeXMLHttpRequestLog: function (event) {}, // functions to generate custom XMLHttpRequest logs, see part 5 "LogList description and custom logs"
  customizeDeviceLog: function (userAgent) {}, // functions to generate custom device logs, see part 5 "LogList description and custom logs"
  customizePerformanceLog: function (performance) {} // functions to generate custom performance logs, see part 5 "LogList description and custom logs"
};
```

## Loglist description and custom log object

Loglist is a JS array for storing all logs. We can use `getloglist()` to get this array, and further develop the logic of log reporting and log storage according to our business needs.
In addition, we can expand the log object according to our own business requirements.

If we need to add custom data, first we need to assign the `custom` attribute in the configuration item object passed in to the tracker to true, and implement the custom data function according to our own needs.

### Log object description

#### Introduction

The log object is the basic log object, which contains the following properties:

```javascript
{
  "logtime": 1584262658187, // log generation time
  "url": "www.shadowingszy.top", // the URL that generates the log page
  "logSession": "xxx", // sessionId
  "logUser": "xxx", // userId
  "logType": "Error Log", // the types of logs, including: event log | error log | XMLHttpRequest log | device log | performance log | Custom Log
  "logContent": {} // specific log information
}
```

#### Custom log object

The custom log object contains the following properties:

```javascript
{
  "logtime": 1584262658187, // log generation time
  "url": "www.shadowingszy.top", // the URL that generates the log page
  "logSession": "xxx", // sessionId
  "logUser": "xxx", // userId
  "logtype": "error log", // the types of logs, including: event log | error log | XMLHttpRequest log | device log | performance log | Custom Log
  "logcontent": {} // specific log information
  "custom": {// custom log fields
    "log": {}, // the value returned after executing the customizelog() method in the configuration item
    "detail": {} // the value returned by a type of log after executing the corresponding customizeeventlog(), customizeerrorlog(), customizexmlhttprequestlog(), customizedevicelog(), customizeperformancelog() methods in the configuration item
  }
}
```

By implementing the 'customizelog' method in the configuration item, we can customize the log object and use the return value of the 'customizelog' function as the value of the 'custom. Log' attribute in the log object.

`Customizelog`method parameter description:
|parameter name | parameter type | parameter description|
| - | - | - |
|logType | string | the type of log, including:`Event log | Error log | XMLHttpRequest log | Device log | Performance log | Custom Log`
|logContent | object | log specific information|

### Event log object

#### Introduction

The event log object is a log object that records click event, keyboard input event and url change event. It will be displayed in the `logContent` property of the corresponding type of log object.
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

Input event:

```javascript
{
  'domPath': 'H1', // the DOM path of the current event
  "trackingType": "Keyup", // event
  "inputKey": "3", // the input value
  "currentValue": "123" // the value of the current input box
}
```

Url change event：

```javascript
{
  "newUrl": "https://www.shadowingszy.top/#new"
  "oldUrl": "https://www.shadowingszy.top/#old"
  "trackingType": "urlchange"
}
```

#### Custom description

By implementing the `customizeEventLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeEventLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeEventLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|event | object | the event object that currently triggers the event

### Error log object

#### Introduction

Error log object is a log object that records JS errors on the current page. It will be displayed in the `logContent` property of the corresponding type of log object.
The error log object contains the following properties:

```javascript
{
  "errorType": "Customize", // the type of error, including: JS | customize | window.onerror | window.onunhandledrection
  "errorMsg": "this is error message", // error message
}
```

Note: errorType details
|type | Description |
| - | - |
|js | JavaScript code error|
|customize | `console. Error()` reports an error, which does not contain error stack information|
|window.onerror | `window.onerror` callback error|
|window.onunhandledrejection | `window.onunhandledrejection` callback reports an error|

#### customize description

By implementing the `customizeErrorLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeErrorLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeErrorLog` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|error | object | the error object that triggered the error

### XMLHttpRequest log object

#### Introduction

XMLHttpRequest log object is a log object that records XMLHttpRequest. It will be displayed in the `logContent` attribute of the corresponding type of log object.
It can also capture log of `fetch API`

Log content:

```javascript
{
  "duration": 10, // request duration
  "event": "ajaxLoadEnd", // current event
  "status": 200, // status code
  "response": "", // return content
  "url": "xxx" // request url
}
```

#### customize description

This kind of log not support customize.

### Device log object

#### Introduction

The device log object is a log object that records user device information. It will be displayed in the `logContent` property of the corresponding type of log object, including the following properties:

```javascript
{
  "browser": true, // whether it is a PC browser
  "mobile": false, // is the mobile browser
  "type": "computer", // the category of the current terminal, including: computer, IOS, Android, wechat, Windows Phone, unknown
  "version": "80.0.3987.132", // version number
  "name": "Chrome", // the category of the current browser, including: MSIE, Firefox, chrome, sarfari, Android, IOS, unknown
  "userAgent": "", // value of navigator.useragent
  "screenWidth": 1920, // screen width
  "screenHeight": 1080, // screen height
  "clientWidth": 1920, // client width
  "clientHeight": 1080, // client height
}
```

#### customize description

By implementing the `customizeDeviceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizeDeviceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeDeviceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|device | object | `navigator.useragent` object

### performance log object

#### Basic instructions

The performance log object is a log object that records page performance data. It will be displayed in the `logContent` property of the corresponding type of log object, including the following properties:

```javascript
{
  "loadType": "reload",
  "loadPageTime": 0, // the time when the page loading is completed
  "domReadyTime": 0, // time to parse DOM tree structure
  "redirectTime": 0, // redirection time
  "domainLookupTime": 0, // DNS query time
  "timeToFirstByte": 0, // the time taken to read the first byte of the page, that is, the time taken by the user to get your resources
  "requestTime": 0, // time when content loading is completed
  "loadEventTime": 0, // the time when the onload callback function is executed
  "cacheTime": 0, // DNS cache time
  "unloadTime": 0, // time to unload the page
  "connectTime": 0 // the time for TCP to establish the connection and complete the handshake
}
```

Note: the performance log object uses `window.performance` to record page performance data, so only IE9 and above browsers are supported

#### User defined description

By implementing the `customizePerformanceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizePerformanceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizePerformanceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|performance | object | `window.performance` object

## Time Travel feature

This feature reproduces all user actions based on Event Log data in the logList and generates NightWatch E2E test code from the logs. We only need to install NightWatch and execute this code to reproduce user actions.

We can set parameters in the tacker configuration item.
|Parameter Name|Parameter Description
| - | - |
| timeTracelInitTime | Initialize page wait time in generated time travel code|
| timeTravelClickDelayTime | Delay time of click on the element in generated time travel code |
| timeTracelInputDelayTime | Delay time of input data in generated time travel code|

Generate code examples:

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
    .pause(1000);
}
```

## shadow-tracker-analyzer introduction

### import through NPM

```bash
npm install shadow-tracker-analyzer
```

```javascript
import { ShadowTrackerAnalyzer } from 'shadow-tracker-analyzer';

const logList = []; // log list upload by shadow-tracker

const analyzer = new ShadowTrackerAnalyzer({
  maxLogListLength: 50000,
  jumpOutTimeLimit: 30 * 1000
});

analyzer.addLog(logList); // add log to analyzer

const overview = analyzer.getOverview(); // get data overview
const urlStatisticInfo = analyzer.getUrlStatisticInfo(); // get url statistic information
const deviceInfo = analyzer.getDeviceInfo(); // get device information
const performanceInfo = analyzer.getPerformanceInfo(); // get performance information
```

### Options

When initialize analyzer, a configuration object can be passed in to enrich the functionality of the analyzer.

```javascript
const option = {
  maxLogListLength: 50000, // max log list count
  jumpOutTimeLimit: 30 * 1000 // jump out time limit, for jump out rate
};
```

### API

#### getOverview()

get data overview

return value:

```javascript
{
  pv: 85, // pv
  uv: 10, // uv
  jumpOutRate: 0.27058823529411763, // jump out rate
  averageVisitTime: 6885017 // averate visit time
}
```

#### getUrlStatisticInfo()

get url statistic

return value：

```javascript
[
  {
    url: 'https://a.com/b', // visit url
    visitNumber: 61 // visit number
  },
  {
    url: 'https://a.com/c',
    visitNumber: 54
  }
];
```

#### getDeviceInfo()

get device information

return value：

```javascript
{
  screenInfo: [ // screen information
    { info: '1280x800', number: 10 },
    { info: '1920x1080', number: 35 }
  ],
  clientInfo: [ // client(window) information
    { info: '980x1708', number: 1 },
    { info: '1024x640', number: 1 }
  ],
  browserInfo: [ // browser information
    { info: 'iphone(ios)', number: 1 },
    { info: 'firefox(computer)', number: 4 },
    { info: 'chrome(computer)', number: 86 }
  ]
}
```

#### getPerformanceInfo()

get performance information

return value：

```javascript
{
  cacheTime: 8090, // DNS cache time
  connectTime: 18431, // the time for TCP to establish the connection and complete the handshake
  domReadyTime: 59322, // time to parse DOM tree structure
  domainLookupTime: 13384, // DNS query time
  loadEventTime: 32, // 执行 onload 回调函数的时间
  loadPageTime: 77772, // the time when the onload callback function is executed
  redirectTime: 202, // redirection time
  requestTime: 17151, // time when content loading is completed
  timeToFirstByte: 63315, // the time taken to read the first byte of the page, that is, the time taken by the user to get your resources
  unloadTime: 0 // time to unload the page
}
```

#### getCustomLogByKeys(keys)

get all custom log by keys

return value：

```javascript
{
  "key1": [
    {
      "logTime": 1584262658187,
      "url": "xxx",
      "logSession": "xxx",
      "logUser": "xxx",
      "logKey": "key1",
      "logType": "Custom Log",
      "logContent": {}
    },
    {
      "logTime": 1584262658187,
      "url": "xxx",
      "logSession": "xxx",
      "logUser": "xxx",
      "logKey": "key1",
      "logType": "Custom Log",
      "logContent": {}
    }
  ],
  "key2": []
}
```
