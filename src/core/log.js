/**
 * 日志类
 * @author shadowingszy
 */

class Log {
  constructor(options, logType, logContent, customizeDetailData) {
    this.logTime = new Date().getTime() // 日志发生时间
    this.url = options.encodeURI ? encodeURIComponent(window.location.href) : window.location.href // 页面的url
    this.logType = logType
    this.logContent = logContent
    if (options.custom) {
      this.custom = {
        log: options.customizeLog(logType, logContent),
        detail: customizeDetailData
      }
    }
  }
}

export default Log
