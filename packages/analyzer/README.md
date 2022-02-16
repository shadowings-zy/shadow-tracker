# shadow-tracker-analyzer（中文）

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
