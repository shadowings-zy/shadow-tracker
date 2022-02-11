/**
 * 事件处理模块，用于监控页面上的事件
 * @author shadowingszy
 */

import { LOG_TYPE, TrackerLog } from '../core/log';
import { Tracker } from '../core/tracker';
import { handleDomPathTrack, handleInputTrack, handlePositionTrack } from '../utils/eventUtils';

let oldUrl: string = '';

export function captureEvent(tracker: Tracker) {
  oldUrl = window.location.href;
  captureDomEvent(tracker);
  captureUrlHashEvent(tracker);
  captureUrlHistoryEvent(tracker);
}

/**
 * 处理Dom相关的事件
 * @param {*} tracker
 */
function captureDomEvent(tracker: Tracker) {
  document.body.addEventListener('mousedown', function (event) {
    try {
      const trackData = handleDomPathTrack(event, tracker.trackerOptions.useClass);
      const positionTrackData = handlePositionTrack(event);
      const eventLog = Object.assign(trackData, positionTrackData);

      const log = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.EVENT,
        eventLog,
        tracker.trackerOptions.customizeEventLog(event)
      );
      tracker.addLog(log);

      console.debug('capture dom event log:\n', log);
    } catch (e) {
      console.debug('capture dom event error:\n', e);
    }
  });

  document.body.addEventListener('keydown', function (event) {
    try {
      const trackData = handleDomPathTrack(event, tracker.trackerOptions.useClass);
      const inputTrackData = handleInputTrack(event);
      const eventLog = Object.assign(trackData, inputTrackData);

      const log = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.EVENT,
        eventLog,
        tracker.trackerOptions.customizeEventLog(event)
      );
      tracker.addLog(log);

      console.debug('capture keydown event log:\n', log);
    } catch (e) {
      console.debug('capture keydown event error:\n', e);
    }
  });
}

/**
 * 处理url hash相关的事件
 * @param {*} tracker
 */
function captureUrlHashEvent(tracker: Tracker) {
  window.addEventListener('hashchange', function (event) {
    try {
      if (oldUrl === window.location.href) {
        return;
      }

      let eventLog = {
        trackingType: 'urlchange',
        oldUrl,
        newUrl: window.location.href
      };
      oldUrl = window.location.href;

      const log = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.EVENT,
        eventLog,
        tracker.trackerOptions.customizeEventLog(event)
      );
      tracker.logList.push(log);

      console.debug('capture hashchange event log:\n', log);
    } catch (e) {
      console.debug('capture hashchange event error:\n', e);
    }
  });
}

/**
 * 处理url history相关的event
 * @param {*} tracker
 */
function captureUrlHistoryEvent(tracker: Tracker) {
  window.addEventListener('popstate', function (event) {
    try {
      if (oldUrl === window.location.href) {
        return;
      }

      let eventLog = {
        trackingType: 'urlchange',
        oldUrl,
        newUrl: window.location.href
      };

      oldUrl = window.location.href;

      const log = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.EVENT,
        eventLog,
        tracker.trackerOptions.customizeEventLog(event)
      );
      tracker.logList.push(log);

      console.debug('capture popstate event log:\n', log);
    } catch (e) {
      console.debug('capture popstate event error:\n', e);
    }
  });

  // 然后要重写一下history api中的pushState和replaceState函数
  let originPushState = history.pushState;
  history.pushState = function () {
    originPushState.apply(history, arguments);

    try {
      if (oldUrl === window.location.href) {
        return;
      }

      let eventLog = {
        trackingType: 'urlchange',
        oldUrl,
        newUrl: window.location.href
      };

      oldUrl = window.location.href;

      const log = new TrackerLog(tracker.trackerOptions, LOG_TYPE.EVENT, eventLog);
      tracker.logList.push(log);

      console.debug('execute pushstate function log:\n', log);
    } catch (e) {
      console.debug('execute pushstate function error:\n', e);
    }
  };

  let originReplaceState = history.replaceState;
  history.replaceState = function () {
    originReplaceState.apply(history, arguments);

    try {
      if (oldUrl === window.location.href) {
        return;
      }

      let eventLog = {
        trackingType: 'urlchange',
        oldUrl,
        newUrl: window.location.href
      };

      oldUrl = window.location.href;

      const log = new TrackerLog(tracker.trackerOptions, LOG_TYPE.EVENT, eventLog);
      tracker.logList.push(log);

      console.debug('execute replaceState function log:\n', log);
    } catch (e) {
      console.debug('execute replaceState function error:\n', e);
    }
  };
}
