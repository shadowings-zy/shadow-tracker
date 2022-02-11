/**
 * 监控js错误模块
 * @author shadowingszy
 */

import { LOG_TYPE, TrackerLog } from '../core/log';
import { Tracker } from '../core/tracker';

export function captureJsError(tracker: Tracker) {
  overWriteConsoleError(tracker);
  handleOnErrorEvent(tracker);
  handleRejectionEvent(tracker);
}

function overWriteConsoleError(tracker: Tracker) {
  // 重写console.error, 可以捕获更全面的报错信息
  const oldFunction = console.error;
  console.error = function (error) {
    oldFunction.apply(console, arguments);

    try {
      let errorMsg = arguments[0] && arguments[0].message ? arguments[0].message : error;
      const errorObj = arguments[0] && arguments[0].stack ? arguments[0].stack : '';

      // 如果报错中不包含错误堆栈，可以认为是console.err()的自定义报错，而非JS报错
      if (!errorObj) {
        if (typeof errorMsg === 'object') {
          try {
            errorMsg = JSON.stringify(errorMsg);
          } catch (e) {
            errorMsg = '错误无法解析';
          }
        }

        const errorLogContent = {
          errorType: 'customize',
          errorMsg: 'Customize Error: ' + errorMsg
        };
        const errorLog = new TrackerLog(
          tracker.trackerOptions,
          LOG_TYPE.ERROR,
          errorLogContent,
          tracker.trackerOptions.customizeErrorLog(error)
        );
        tracker.addLog(errorLog);

        console.debug('capture console error output log:\n', errorLog);
      } else {
        const errorLogContent = {
          errorType: 'js',
          errorMsg: errorMsg
        };
        const errorLog = new TrackerLog(
          tracker.trackerOptions,
          LOG_TYPE.ERROR,
          errorLogContent,
          tracker.trackerOptions.customizeErrorLog(error)
        );
        tracker.addLog(errorLog);

        console.debug('capture console error output log:\n', errorLog);
      }
    } catch (e) {
      console.debug('capture console error output error:\n', e);
    }
  };
}

function handleOnErrorEvent(tracker: Tracker) {
  // 重写 onerror 进行jsError的监听
  const oldFunction = window.onerror;
  window.onerror = function () {
    oldFunction.apply(window, arguments);

    try {
      const errorMessage = arguments[0] || '';
      const errorObject = arguments[4] || {};
      const errorStack = errorObject ? errorObject.stack : '';

      const errorLogContent = {
        errorType: 'window.onerror',
        errorMsg: errorMessage,
        errorStack: errorStack
      };
      const errorLog = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.ERROR,
        errorLogContent,
        tracker.trackerOptions.customizeErrorLog(errorMessage)
      );
      tracker.logList.push(errorLog);

      console.debug('capture onerror event log:\n', errorLog);
    } catch (e) {
      console.debug('capture onerror event error:\n', e);
    }
  };
}

function handleRejectionEvent(tracker: Tracker) {
  // 重写 onunhandledrejection 进行jsError的监听
  const oldFunction = window.onunhandledrejection;
  window.onunhandledrejection = function () {
    oldFunction.apply(window, arguments);
    try {
      const error = arguments[0];
      let errorMsg = '';
      let errorStack = '';

      if (error && typeof error.reason === 'object') {
        errorMsg = error.reason.message;
        errorStack = error.reason.stack;
      } else {
        errorMsg = error.reason;
        errorStack = '';
      }

      const errorLogContent = {
        errorType: 'window.onunhandledrejection',
        errorMsg: errorMsg,
        errorStack: errorStack
      };
      const errorLog = new TrackerLog(
        tracker.trackerOptions,
        LOG_TYPE.ERROR,
        errorLogContent,
        tracker.trackerOptions.customizeErrorLog(error)
      );
      tracker.logList.push(errorLog);

      console.debug('capture rejection event log:\n', errorLog);
    } catch (e) {
      console.debug('capture rejection event error:\n', e);
    }
  };
}
