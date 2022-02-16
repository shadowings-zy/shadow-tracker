# shadow-tracker（中文）

## 介绍

shadow-tracker 是一款轻量级的前端无感知监控插件，它提供的功能有：

| 序号 | 功能                                                                                 | 对应日志类型                   |
| ---- | ------------------------------------------------------------------------------------ | ------------------------------ |
| 1    | 收集用户与网页交互时的点击、键盘输入、url 变更事件                                   | 事件日志（Event Log）          |
| 2    | 收集所有 JS 的错误信息                                                               | 错误日志（Error Log）          |
| 3    | 收集所有 XMLHTTPRequest 网络请求信息                                                 | 请求日志（XMLHttpRequest Log） |
| 4    | 收集页面加载的性能数据信息                                                           | 性能日志（Performance Log）    |
| 5    | 收集用户的设备信息                                                                   | 设备日志（Device Log）         |
| 6    | 提供时间旅行功能，可根据用户的操作生成 NightWatch e2e 测试代码，复现用户的每一步操作 | 无                             |
| 7    | 支持对日志的自定义拓展                                                               | 无                             |
| 8    | 提供配套的日志分析工具                                                               | 无                             |

备注：“页面的性能数据信息”日志功能需要浏览器支持 performance API，其他日志功能均支持 IE7 及以上浏览器。

## 使用方法

### 通过 npm 引入

```bash
npm install shadow-tracker
```

```javascript
// 使用import引入tracker即可访问tracker的API
// 这里只呈现了“初始化tracker”以及“获取日志信息”的代码，其他API使用请参照第三部分“API说明”

import tracker from 'shadow-tracker';

tracker.init(); // 初始化tracker
console.log(tracker.getLogList()); // 获取日志信息
```

### 通过`<script>`标签引入

```html
<script src="http://www.shadowingszy.top/ShadowTracker/script/shadow-tracker-script.js"></script>
<script>
  // 引入之后tracker对象就会挂到window对象下，使用window.tracker即可访问tracker的API
  // 这里只呈现了“初始化tracker”以及“获取日志信息”的代码，其他API使用请参照第三部分“API说明”

  window.tracker.init(); // 初始化tracker
  console.log(window.tracker.getLogList()); // 获取日志信息
</script>
```

注：由于服务器资源有限，建议先从`"http://www.shadowingszy.top/ShadowTracker/script/shadow-tracker-script.js"`这里下载 shadow-tracker 脚本文件。

## API 说明

### init(options)

初始化 tracker

参数说明：
options - 传入一个配置项对象，详见第四部分“配置项说明”

使用样例：

```javascript
tracker.init({});
```

### getDeviceInfo()

获取用户设备信息并将设备信息写入 logList 中，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getDeviceInfo());
```

### getPerformanceInfo()

获取页面性能数据并将页面性能信息写入 logList 中，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getPerformanceInfo());
```

### getLogList()

获取日志数据，详见第五部分“logList 说明及自定义 Log”

使用样例：

```javascript
console.log(tracker.getLogList());
```

### getTimeTravelCode()

获取时间旅行代码，详见第六部分“时间旅行功能”

使用样例：

```javascript
console.log(tracker.getTimeTravelCode());
```

## 配置项说明

在初始化 tracker 时，可传入配置项来丰富 tracker 的功能。

```javascript
// 这是shadow-tracker的默认配置项，我们以此为例
const option = {
  sessionId: `${Date.now()}${Math.floor(Math.random() * 1000)}`, // sessionId，默认为当前时间+一个随机数
  userId: `${Date.now()}${Math.floor(Math.random() * 1000)}`, // userId，默认为当前时间+一个随机数
  useClass: false, // 是否使用class作为元素的唯一ID
  maxResponseTextLength: 1000, // 记录XMLHttpRequest返回值的最大长度
  timeTracelInitTime: 3000, // 生成的时间旅行代码中，初始化页面的等待时间
  timeTravelClickDelayTime: 1000, // 生成的时间旅行代码中，点击元素的延迟时间
  timeTracelInputDelayTime: 1000, // 生成的时间旅行代码中，输入数据的延迟时间
  captureEvent: true, // 是否收集事件日志
  captureJsError: true, // 是否收集错误日志
  captureXMLHttpRequest: true, // 是否收集请求日志
  custom: false, // 是否在日志对象中加入自定义数据
  customizeLog: function (logType, logContent) {}, // 生成自定义log数据的函数，详见第五部分“logList 说明及自定义 Log”
  customizeEventLog: function (event) {}, // 生成自定义event log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeErrorLog: function (error) {}, // 生成自定义error log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeXMLHttpRequestLog: function (event) {}, // 生成自定义XMLHttpRequest log的函数，详见第五部分“logList 说明及自定义 Log”
  customizeDeviceLog: function (userAgent) {}, // 生成自定义device log的函数，详见第五部分“logList 说明及自定义 Log”
  customizePerformanceLog: function (performance) {} // 生成自定义performance log的函数，详见第五部分“logList 说明及自定义 Log”
};
```

## logList 说明及自定义 Log

logList 是存储全部日志的 js 数组，我们可以使用`getLogList()`来获取到这个数组，并针对自己的业务需求进一步开发日志上报、日志储存等逻辑。
另外，我们还可以根据自己的业务需求，对日志对象进行拓展。

如果我们需要添加自定义数据，首先我们需要把传入 tracker 的配置项对象中的`custom`属性赋值为 true，并根据自己的需求实现自定义数据函数。

### Log 对象说明

#### 基础说明

Log 对象是基础的日志对象，它包含如下属性：

```javascript
{
  "logTime": 1584262658187, // 日志产生的时间
  "url": "www.shadowingszy.top", // 产生日志页面的url
  "logSession": "xxx", // sessionId
  "logUser": "xxx", // userId
  "logType": "Error Log", // 日志的种类，包含：Event Log | Error Log | XMLHttPRequest Log | Device Log | Performance Log 五种
  "logContent": {} // 日志的具体信息
}
```

#### 自定义说明

自定义 Log 对象包含如下属性：

```javascript
{
  "logTime": 1584262658187, // 日志产生的时间
  "url": "www.shadowingszy.top", // 产生日志页面的url
  "logSession": "xxx", // sessionId
  "logUser": "xxx", // userId
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
| logType | string | 日志的种类，包含：`Event Log | Error Log | XMLHttpRequest Log | Device Log | Performance Log` 五种
| logContent | object | 日志具体信息，即 Log 对象中的`logContent`属性的值

### Event Log 对象说明

#### 基础说明

Event Log 对象是记录点击、输入、url 变更事件的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
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

url 变更事件：

```javascript
{
  "newUrl": "https://www.shadowingszy.top/#new"
  "oldUrl": "https://www.shadowingszy.top/#old"
  "trackingType": "urlchange"
}
```

#### 自定义说明

通过实现配置项中的`customizeEventLog`方法，我们可以自定义日志对象，并将`customizeEventLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeEventLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| event | object | 当前触发事件的 event 对象

### Error Log 对象说明

#### 基础说明

Error Log 对象是记录当前页面发生的 js 错误的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
Error Log 对象包含如下属性：

```javascript
{
  "errorType": "customize", // error的类型，包含：js | customize | window.onerror | window.onunhandledrejection 四种
  "errorMsg": "This is error message", // 报错信息
}
```

注：errorType 详细说明
| 种类 | 说明
| - | - |
| js | javascript 代码报错 |
| customize | console.error()报错，此种错误不包含错误堆栈信息 |
| window.onerror | window.onerror 回调报错 |
| window.onunhandledrejection | window.onunhandledrejection 回调报错 |

#### 自定义说明

通过实现配置项中的`customizeErrorLog`方法，我们可以自定义日志对象，并将`customizeErrorLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeErrorLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| error | object | 触发错误的 error 对象

### XMLHttPRequest Log 对象说明

#### 基础说明

XMLHttPRequest Log 对象是记录 XMLHttpRequest 的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中。
另外，它也能收集`fetch API`的日志。

具体内容如下：

```javascript
{
  "duration": 10, // 请求耗时
  "event": "XMLHttpRequest", // 请求类型
  "response": 10, // 返回内容
  "status": 200, // 状态码
  "url": "xxx" // 请求url
```

#### 自定义说明

此日志暂不支持自定义。

### Device Log 对象说明

#### 基础说明

Device Log 对象是记录用户设备信息的日志对象，它会呈现在对应种类的 Log 对象的`logContent`属性中，包含如下属性：

```javascript
{
  "browser": true, // 是否为PC端浏览器
  "mobile": false, // 是否为手机端浏览器
  "type": "computer", // 当前终端的类别，包含：computer, ios, android, wechat, windows phone, unknow
  "version": "80.0.3987.132", // 版本号
  "name": "chrome", // 当前浏览器的类别，包含：msie, firefox, chrome, sarfari, android, ios, unknown
  "userAgent": "", // navigator.userAgent的值
  "screenWidth": 1920, // 屏幕宽度
  "screenHeight": 1080, // 屏幕高度
  "clientWidth": 1920, // 网页宽度
  "clientHeight": 1080, // 网页高度
}
```

#### 自定义说明

通过实现配置项中的`customizeDeviceLog`方法，我们可以自定义日志对象，并将`customizeDeviceLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizeDeviceLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| device | object | `navigator.userAgent`对象

### Performance Log 对象说明

#### 基础说明

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

#### 自定义说明

通过实现配置项中的`customizePerformanceLog`方法，我们可以自定义日志对象，并将`customizePerformanceLog`函数的返回值作为 Log 对象中`custom.detail`属性的值。

`customizePerformanceLog`方法参数说明:
| 参数名 | 参数类型 | 参数说明
| - | - | - |
| performance | object | `window.performance`对象

## 时间旅行功能

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
    .pause(1000);
}
```

## 日志分析工具使用

### 通过 npm 引入

```bash
npm install shadow-tracker-analyzer
```

```javascript
import { ShadowTrackerAnalyzer } from 'shadow-tracker-analyzer';

const logList = []; // 这是上报上来的日志列表

const analyzer = new ShadowTrackerAnalyzer({
  maxLogListLength: 50000,
  jumpOutTimeLimit: 30 * 1000
});

analyzer.addLog(logList); // 添加日志到分析器中

const overview = analyzer.getOverview(); // 获取数据概览
const urlStatisticInfo = analyzer.getUrlStatisticInfo(); // 获取页面访问数据
const deviceInfo = analyzer.getDeviceInfo(); // 获取设备数据
const performanceInfo = analyzer.getPerformanceInfo(); // 获取页面性能数据
```

### 配置项说明

在初始化 analyzer 时，可传入配置项来丰富 analyzer 的功能。

```javascript
// 这是默认配置项，我们以此为例
const option = {
  maxLogListLength: 50000, // 支持同时分析日志的数量
  jumpOutTimeLimit: 30 * 1000 // 计算跳出率时的跳出时间
};
```

### API 说明

#### getOverview()

获取数据概览

返回值：

```javascript
{
  pv: 85, // pv
  uv: 10, // uv
  jumpOutRate: 0.27058823529411763, // 跳出率
  averageVisitTime: 6885017 // 平均访问时间（毫秒）
}
```

#### getUrlStatisticInfo()

获取页面访问数据

返回值：

```javascript
[
  {
    url: 'https://a.com/b', // 访问页面路径
    visitNumber: 61 // 访问次数
  },
  {
    url: 'https://a.com/c',
    visitNumber: 54
  }
];
```

#### getDeviceInfo()

获取设备数据

返回值：

```javascript
{
  screenInfo: [ // 显示设备分辨率及数量
    { info: '1280x800', number: 10 },
    { info: '1920x1080', number: 35 }
  ],
  clientInfo: [ // 浏览器设备分辨率及数量
    { info: '980x1708', number: 1 },
    { info: '1024x640', number: 1 }
  ],
  browserInfo: [ // 浏览器型号及数量
    { info: 'iphone(ios)', number: 1 },
    { info: 'firefox(computer)', number: 4 },
    { info: 'chrome(computer)', number: 86 }
  ]
}
```

#### getPerformanceInfo()

获取页面性能数据

返回值：

```javascript
{
  cacheTime: 8090, // DNS 缓存时间
  connectTime: 18431, // TCP 建立连接完成握手的时间
  domReadyTime: 59322, // 解析 DOM 树结构的时间
  domainLookupTime: 13384, // DNS 查询时间
  loadEventTime: 32, // 执行 onload 回调函数的时间
  loadPageTime: 77772, // 页面加载完成的时间
  redirectTime: 202, // 重定向的时间
  requestTime: 17151, // 内容加载完成的时间
  timeToFirstByte: 63315, // 读取页面第一个字节的时间，即用户拿到你的资源占用的时间
  unloadTime: 0 // 卸载页面的时间
}
```
