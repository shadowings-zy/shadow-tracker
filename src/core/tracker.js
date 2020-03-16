/**
 * Tracker类的实现，我们所有的监控功能都集成此类中。
 * @author shadowingszy
 */

import { captureDeviceInfo } from './device-handler'

import { capturePerformance } from './page-performance-handler'

import { captureEvent } from './event-handler'

import { captureJsError } from './js-error-handler'

import { generateTimeTravelCode } from './time-travel-handler'

import { captureXMLHttpRequest } from './xml-http-request-handler'

const defaultOptions = {
  useClass: false,
  maxResponseTextLength: 1000,
  timeTracelInitTime: 3000,
  timeTravelClickDelayTime: 1000,
  timeTracelInputDelayTime: 1000,
  custom: false,
  customizeLog: (logType, logContent) => {},
  customizeEventLog: (event) => {},
  customizeErrorLog: (error) => {},
  customizeXMLHttpRequestLog: (event) => {},
  customizeDeviceLog: (userAgent) => {},
  customizePerformanceLog: (performance) => {}
}

class Tracker {
  constructor() {
    this.trackerInitialized = false // tracker是否已经初始化，使tracker成为单例
    this.trackerOptions = defaultOptions // tracker的设置
    this.logList = [] // 日志列表
  }

  getDeviceInfo() {
    captureDeviceInfo(this)
  }

  getPerformanceInfo() {
    capturePerformance(this)
  }

  getLogList() {
    return this.logList
  }

  getTimeTravelCode() {
    return generateTimeTravelCode(
      this.logList,
      this.trackerOptions.timeTracelInitTime,
      this.trackerOptions.timeTravelClickDelayTime,
      this.trackerOptions.timeTracelInputDelayTime
    )
  }

  init(options = {}) {
    this.trackerOptions = Object.assign(defaultOptions, options)
    if (!this.trackerInitialized) {
      captureEvent(this)
      captureJsError(this)
      captureXMLHttpRequest(this)
      this.trackerInitialized = true
    }
    return this
  }
}

export default Tracker
