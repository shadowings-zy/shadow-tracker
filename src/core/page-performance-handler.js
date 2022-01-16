/**
 * 监控页面统计数据的模块
 * @author shadowingszy
 *
 * 使用performance API进行页面数据监控，IE9以上均支持
 */

import Log from './log';

export function capturePerformance(tracker) {
  const performanceData = getPerformance();

  const performanceLog = new Log(
    tracker.trackerOptions,
    'Performance Log',
    performanceData,
    tracker.sessionId,
    tracker.trackerOptions.customizePerformanceLog(window.performance)
  );
  tracker.logList.push(performanceLog);

  console.debug('Performance Traking Log:\n', performanceLog);
}

/**
 * 获取页面性能数据信息
 */
function getPerformance() {
  let performanceOutput = {};
  if (window.performance) {
    const entry = window.performance.getEntries();
    if (entry[0] && entry[0].type === 'navigate') {
      performanceOutput.loadType = 'load';
    } else {
      performanceOutput.loadType = 'reload';
    }
  }

  const timing = performance && performance.timing;
  if (timing) {
    // 页面加载完成的时间
    performanceOutput.loadPageTime = timing.loadEventEnd - timing.navigationStart;

    // 解析 DOM 树结构的时间
    performanceOutput.domReadyTime = timing.domComplete - timing.responseEnd;

    // 重定向的时间
    performanceOutput.redirectTime = timing.redirectEnd - timing.redirectStart;

    // DNS 查询时间
    performanceOutput.domainLookupTime = timing.domainLookupEnd - timing.domainLookupStart;

    // 读取页面第一个字节的时间，即用户拿到你的资源占用的时间
    performanceOutput.timeToFirstByte = timing.responseStart - timing.navigationStart;

    // 内容加载完成的时间
    performanceOutput.requestTime = timing.responseEnd - timing.requestStart;

    // 执行 onload 回调函数的时间
    performanceOutput.loadEventTime = timing.loadEventEnd - timing.loadEventStart;

    // DNS 缓存时间
    performanceOutput.cacheTime = timing.domainLookupStart - timing.fetchStart;

    // 卸载页面的时间
    performanceOutput.unloadTime = timing.unloadEventEnd - timing.unloadEventStart;

    // TCP 建立连接完成握手的时间
    performanceOutput.connectTime = timing.connectEnd - timing.connectStart;
  }

  return performanceOutput;
}
