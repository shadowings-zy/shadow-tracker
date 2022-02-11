/**
 * 监控页面统计数据的模块
 * @author shadowingszy
 *
 * 使用performance API进行页面数据监控
 */

import { LOG_TYPE, TrackerLog } from '../core/log';
import { ITrackerOptions } from '../core/tracker';

export interface IPerformanceData {
  loadPageTime?: number; // 页面加载完成的时间
  domReadyTime?: number; // 解析 DOM 树结构的时间
  redirectTime?: number; // 重定向的时间
  domainLookupTime?: number; // DNS 查询时间
  timeToFirstByte?: number; // 读取页面第一个字节的时间，即用户拿到你的资源占用的时间
  requestTime?: number; // 内容加载完成的时间
  loadEventTime?: number; // 执行 onload 回调函数的时间
  cacheTime?: number; // DNS 缓存时间
  unloadTime?: number; // 卸载页面的时间
  connectTime?: number; // TCP 建立连接完成握手的时间
}

export function capturePerformance(trackerOptions: ITrackerOptions): TrackerLog | undefined {
  try {
    const performanceData = getPerformance();

    const performanceLog = new TrackerLog(
      trackerOptions,
      LOG_TYPE.PERFORMANCE,
      performanceData,
      trackerOptions.customizePerformanceLog(window.performance)
    );

    console.debug('capture performance log:\n', performanceLog);

    return performanceLog;
  } catch (e) {
    console.debug('capture performance error:\n', e);
  }
}

/**
 * 获取页面性能数据信息
 */
function getPerformance() {
  let performanceOutput: IPerformanceData = {};

  if (performance && performance.timing) {
    const timing = performance.timing;

    performanceOutput.loadPageTime = timing.loadEventEnd - timing.navigationStart;
    performanceOutput.domReadyTime = timing.domComplete - timing.responseEnd;
    performanceOutput.redirectTime = timing.redirectEnd - timing.redirectStart;
    performanceOutput.domainLookupTime = timing.domainLookupEnd - timing.domainLookupStart;
    performanceOutput.timeToFirstByte = timing.responseStart - timing.navigationStart;
    performanceOutput.requestTime = timing.responseEnd - timing.requestStart;
    performanceOutput.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
    performanceOutput.cacheTime = timing.domainLookupStart - timing.fetchStart;
    performanceOutput.unloadTime = timing.unloadEventEnd - timing.unloadEventStart;
    performanceOutput.connectTime = timing.connectEnd - timing.connectStart;
  }

  return performanceOutput;
}
