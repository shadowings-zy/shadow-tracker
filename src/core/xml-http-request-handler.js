/**
 * AJAX请求模块
 * 包含了对XMLHttpRequest的封装
 * @author shadowingszy
 */

import Log from './log'

const originXMLHttpRequest = window.XMLHttpRequest

// 自定义event，丰富XMLHttpRequest的状态
function ajaxEventTrigger(event) {
  const ajaxEvent = new CustomEvent(event, {
    detail: this
  })
  window.dispatchEvent(ajaxEvent)
}

// 自定义XMLHttpRequest
function customXMLHttpRequest() {
  const newXMLHttpRequest = new originXMLHttpRequest()
  newXMLHttpRequest.addEventListener('abort', function () {
    ajaxEventTrigger.call(this, 'ajaxAbort')
  }, false)
  newXMLHttpRequest.addEventListener('error', function () {
    ajaxEventTrigger.call(this, 'ajaxError')
  }, false)
  newXMLHttpRequest.addEventListener('load', function () {
    ajaxEventTrigger.call(this, 'ajaxLoad')
  }, false)
  newXMLHttpRequest.addEventListener('loadstart', function () {
    ajaxEventTrigger.call(this, 'ajaxLoadStart')
  }, false)
  newXMLHttpRequest.addEventListener('progress', function () {
    ajaxEventTrigger.call(this, 'ajaxProgress')
  }, false)
  newXMLHttpRequest.addEventListener('timeout', function () {
    ajaxEventTrigger.call(this, 'ajaxTimeout')
  }, false)
  newXMLHttpRequest.addEventListener('loadend', function () {
    ajaxEventTrigger.call(this, 'ajaxLoadEnd')
  }, false)
  newXMLHttpRequest.addEventListener('readystatechange', function () {
    ajaxEventTrigger.call(this, 'ajaxReadyStateChange')
  }, false)
  return newXMLHttpRequest
}

export function captureXMLHttpRequest(tracker) {
  window.XMLHttpRequest = customXMLHttpRequest

  window.addEventListener('ajaxLoadStart', function (e) {
    const loadStartLog = {
      event: 'ajaxLoadStart'
    }
    const xmlHttpRequestLog = new Log(tracker.trackerOptions, 'XMLHttpRequest Log', loadStartLog, tracker.trackerOptions.customizeXMLHttpRequestLog(e))
    tracker.logList.push(xmlHttpRequestLog)

    // console.log('XMLHttpRequest Traking Log:\n', xmlHttpRequestLog)
  })

  window.addEventListener('ajaxLoadEnd', function (e) {
    const loadEndLog = {
      event: 'ajaxLoadEnd',
      status: e.detail.status,
      response: e.detail.response.toString().substring(0, tracker.trackerOptions.maxResponseTextLength)
    }
    const xmlHttpRequestLog = new Log(tracker.trackerOptions, 'XMLHttpRequest Log', loadEndLog, tracker.trackerOptions.customizeXMLHttpRequestLog(e))
    tracker.logList.push(xmlHttpRequestLog)

    // console.log('XMLHttpRequest Traking Log:\n', xmlHttpRequestLog)
  })
}