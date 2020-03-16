/**
 * 事件处理模块，用于监控页面上的事件
 * @author shadowingszy
 */

import Log from './log'

import {
  getEvent,
  getEventListenerMethod
} from '../utils/event-utils'

import {
  getBoundingClientRect,
  getDomPath
} from '../utils/dom-utils'

export function captureEvent(tracker) {
  const events = ['mousedown', 'keyup']
  const eventMethodObj = getEventListenerMethod()
  for (let i = 0; i < events.length; i++) {
    let eventName = events[i]
    document.body[eventMethodObj.addMethod](eventMethodObj.prefix + eventName, function (event) {
      const eventFix = getEvent(event)
      if (!eventFix) {
        return
      }

      const trackData = handleDomPathTrack(eventFix, tracker.trackerOptions.useClass)
      const positionTrackData = handlePositionTrack(eventFix)
      const inputTrackData = handleInputTrack(eventFix)
      let eventLog = {}

      if (eventFix.type === 'mousedown') {
        eventLog = Object.assign(trackData, positionTrackData)
      } else if (eventFix.type === 'keyup') {
        eventLog = Object.assign(trackData, inputTrackData)
      }

      eventLog = new Log(tracker.trackerOptions, 'Event Log', eventLog, tracker.trackerOptions.customizeEventLog(eventFix))
      tracker.logList.push(eventLog)

      // console.log('Event Traking Log:\n', eventLog)
    }, false)
  }
}

/**
 * 处理DOM节点，生成此节点的唯一路径
 * @param {*} event 
 */
function handleDomPathTrack(event, useClass) {
  const domPath = getDomPath(event.target, useClass)
  return {
    domPath: domPath,
    trackingType: event.type
  }
}

/**
 * 生成点击的相对位置
 * @param {*} event 
 */
function handlePositionTrack(event) {
  const rect = getBoundingClientRect(event.target)
  if (rect.width === 0 || rect.height === 0) {
    return
  }
  if (event.pageX !== undefined || event.clientX !== undefined) {
    let t = document.documentElement || document.body.parentNode
    const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
    const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
    const pageX = event.pageX || event.clientX + scrollX
    const pageY = event.pageY || event.clientY + scrollY
    return {
      offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
      offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6),
    }
  }
}

/**
 * 获取当前输入的值
 * @param {*} event 
 */
function handleInputTrack(event) {
  if (event.key !== undefined) {
    return {
      inputKey: event.key,
      currentValue: event.target.value
    }
  }
}