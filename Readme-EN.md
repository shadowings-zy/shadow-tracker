# shadow-tracker(English)

## 1. shadow-tracker introduction

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

## 2. quick start

### 2-1. import through NPM

```bash
npm install shadow-tracker
```

```javascript
import tracker from 'shadow-tracker'

Tracker.Init() // initialize tracker
Console.Log(tracker.Getloglist()) // get log information
```

### 2-2. import through the "script" tag

```html
<script src="./shadow-tracker-script.js"></script>
<script>
  Window.Tracker.Init() // initialize tracker
  Console.Log(window.Tracker.Getloglist()) // get the log information
</script>
```

Note: due to the limited server resources, it is recommended to download the shadow-tracker script file from `"http://www.shadowtracker.top/shadowtracker/script/shadow-tracker-script.js"`.

## 3. API description

### 3-1. init(options)

Initialize tracker

Parameter Description:
Options - configuration item object, see part 4 "options"

Use example:

```javascript
tracker.init({})
```

### 3-2. getDeviceInfo()

Get user's device information and write the device information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getDeviceInfo())
```

### 3-3. getPerformanceInfo()

Get the page performance data and write the page performance information into the loglist. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getPerformanceInfo())
```

### 3-4. getLogList()

Get all log data. For details, see part 5 "loglist description and custom log"

Use example:

```javascript
console.log(tracker.getLogList())
```

### 3-5. getTimeTravelCode()

Get the time travel code. For details, see part 6 "time travel"

Use example:

```javascript
console.log(tracker.getTimeTravelCode())
```

## 4. Options

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

## 5. Loglist description and custom log

Loglist is a JS array for storing all logs. We can use `getloglist()` to get this array, and further develop the logic of log reporting and log storage according to our business needs.
In addition, we can expand the log object according to our own business requirements.

If we need to add custom data, first we need to assign the `custom` attribute in the configuration item object passed in to the tracker to true, and implement the custom data function according to our own needs.

### 5-1. Log object description

#### 5-1-1. Basic description

The log object is the basic log object, which contains the following properties:

```javascript
{
  "logtime": 1584262658187, // log generation time
  "url": "www.shadowingszy.top", // the URL that generates the log page
  "logType": "Error Log", // the types of logs, including: event log | error log | XMLHttpRequest log | device log | performance log
  "logContent": {} // specific log information
}
```

#### 5-1-2. Custom description

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

### 5-2. Description of event log object

#### 5-2-1. Basic description

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

#### 5-2-2. Custom description

By implementing the `customizeEventLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeEventLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeEventLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|event | object | the event object that currently triggers the event

### 5-3. Error log object description

#### 5-3-1. Basic description

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

#### 5-3-2. customize description

By implementing the `customizeErrorLog()` method in the configuration item, we can customize the log object and use the return value of the `customizeErrorLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeErrorLog` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|error | object | the error object that triggered the error

### 5-4. XMLHttpRequest log object description

#### 5-4-1. Basic description

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

#### 5-4-2. customize description

By implementing the `customizeXMLHttpRequestlog()` method in the configuration item, we can customize the log object and use the return value of the `customizeXMLHttpRequestlog()` function as the value of the `custom.detail` attribute in the log object.

`customizeXMLHttpRequestlog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|event | object | event triggering 'ajaxloadstart' or 'ajaxloadend'

### 5-5. Device log object description

#### 5-5-1. Basic description

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

#### 5-5-2. customize description

By implementing the `customizeDeviceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizeDeviceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizeDeviceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|device | object | `navigator.useragent` object

### 5-6. Description of performance log object

#### 5-6-1. Basic instructions

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

#### 5-6-2. User defined description

By implementing the `customizePerformanceLog()` method in the configuration item, we can customize the log object and take the return value of the `customizePerformanceLog()` function as the value of the `custom.detail` attribute in the log object.

`customizePerformanceLog()` method parameter description:
|parameter name | parameter type | parameter description
| - | - | - |
|performance | object | `window.performance` object

## 6. Time Travel feature

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
