/**
 * 事件处理模块，用于监控页面上的事件
 * @author shadowingszy
 */

import Log from './log';

import { getEvent, getEventListenerMethod } from '../utils/event-utils';

import { getBoundingClientRect, getDomPath } from '../utils/dom-utils';

let oldUrl;

export function captureEvent(tracker) {
  oldUrl = window.location.href;
  captureDomEvent(tracker);
  captureUrlHashEvent(tracker);
  captureUrlHistoryEvent(tracker);
}

/**
 * 处理Dom相关的事件
 * @param {*} tracker
 */
function captureDomEvent(tracker) {
  const events = ['mousedown', 'keyup'];
  const { addMethod, prefix } = getEventListenerMethod();
  for (let i = 0; i < events.length; i++) {
    let eventName = events[i];
    document.body[addMethod](
      prefix + eventName,
      function (event) {
        const eventFix = getEvent(event);
        if (!eventFix) {
          return;
        }

        const trackData = handleDomPathTrack(eventFix, tracker.trackerOptions.useClass);
        const positionTrackData = handlePositionTrack(eventFix);
        const inputTrackData = handleInputTrack(eventFix);
        let eventLog = {};

        if (eventFix.type === 'mousedown') {
          eventLog = Object.assign(trackData, positionTrackData);
        } else if (eventFix.type === 'keyup') {
          eventLog = Object.assign(trackData, inputTrackData);
        }

        const log = new Log(
          tracker.trackerOptions,
          'Event Log',
          eventLog,
          tracker.sessionId,
          tracker.trackerOptions.customizeEventLog(eventFix)
        );
        tracker.logList.push(log);

        console.debug('DOM Event Traking Log:\n', log);
      },
      false
    );
  }
}

/**
 * 处理DOM节点，生成此节点的唯一路径
 * @param {*} event
 */
function handleDomPathTrack(event, useClass) {
  const domPath = getDomPath(event.target, useClass);
  return {
    domPath: domPath,
    trackingType: event.type
  };
}

/**
 * 生成点击的相对位置
 * @param {*} event
 */
function handlePositionTrack(event) {
  const rect = getBoundingClientRect(event.target);
  if (rect.width === 0 || rect.height === 0) {
    return;
  }
  if (event.pageX !== undefined || event.clientX !== undefined) {
    let t = document.documentElement || document.body.parentNode;
    const scrollX = (t && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft;
    const scrollY = (t && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
    const pageX = event.pageX || event.clientX + scrollX;
    const pageY = event.pageY || event.clientY + scrollY;
    return {
      offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
      offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6)
    };
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
    };
  }
}

/**
 * 处理url hash相关的事件
 * @param {*} tracker
 */
function captureUrlHashEvent(tracker) {
  const { addMethod, prefix } = getEventListenerMethod();
  console.log('capture url hash event');
  window[addMethod](prefix + 'hashchange', function (event) {
    const eventFix = getEvent(event);
    if (!eventFix) {
      return;
    }

    if (oldUrl === window.location.href) {
      return;
    }

    let eventLog = {
      trackingType: 'urlchange',
      oldUrl,
      newUrl: window.location.href
    };
    oldUrl = window.location.href;

    const log = new Log(
      tracker.trackerOptions,
      'Event Log',
      eventLog,
      tracker.sessionId,
      tracker.trackerOptions.customizeEventLog(eventFix)
    );
    tracker.logList.push(log);

    console.debug('Url Event Traking Log:\n', log);
  });
}

/**
 * 处理url history相关的event
 * @param {*} tracker
 */
function captureUrlHistoryEvent(tracker) {
  console.log('capture url history event');
  // 首先要监听popstate
  const { addMethod, prefix } = getEventListenerMethod();
  window[addMethod](prefix + 'popstate', function (event) {
    const eventFix = getEvent(event);
    if (!eventFix) {
      return;
    }

    if (oldUrl === window.location.href) {
      return;
    }

    let eventLog = {
      trackingType: 'urlchange',
      oldUrl,
      newUrl: window.location.href
    };

    oldUrl = window.location.href;

    const log = new Log(
      tracker.trackerOptions,
      'Event Log',
      eventLog,
      tracker.sessionId,
      tracker.trackerOptions.customizeEventLog(eventFix)
    );
    tracker.logList.push(log);

    console.debug('Url Event Traking Log:\n', log);
  });

  // 然后要重写一下history api中的pushState和replaceState函数
  let originPushState = history.pushState;
  history.pushState = function (...args) {
    originPushState.apply(history, arguments);

    if (oldUrl === window.location.href) {
      return;
    }

    let eventLog = {
      trackingType: 'urlchange',
      oldUrl,
      newUrl: window.location.href
    };

    oldUrl = window.location.href;

    const log = new Log(tracker.trackerOptions, 'Event Log', eventLog, tracker.sessionId, {});
    tracker.logList.push(log);

    console.debug('Url Event Traking Log:\n', log);
  };

  let originReplaceState = history.replaceState;
  history.replaceState = function () {
    originReplaceState.apply(history, arguments);
    if (oldUrl === window.location.href) {
      return;
    }

    let eventLog = {
      trackingType: 'urlchange',
      oldUrl,
      newUrl: window.location.href
    };

    oldUrl = window.location.href;

    const log = new Log(tracker.trackerOptions, 'Event Log', eventLog, tracker.sessionId, {});
    tracker.logList.push(log);

    console.debug('Url Event Traking Log:\n', log);
  };
}
