/**
 * 监控js错误模块
 * @author shadowingszy
 */

import Log from './log';

export function captureJsError(tracker) {
  overWriteConsoleError(tracker);
  handleErrorEvent(tracker);
}

function overWriteConsoleError(tracker) {
  // 重写console.error, 可以捕获更全面的报错信息
  const oldError = console.error;
  console.error = function (error) {
    let errorMsg = (arguments[0] && arguments[0].message) || error;
    const lineNumber = 0;
    const columnNumber = 0;
    const errorObj = arguments[0] && arguments[0].stack;

    // 如果报错中不包含错误堆栈，可以认为是console.err()的自定义报错，而非JS报错
    if (!errorObj) {
      if (typeof errorMsg == 'object') {
        try {
          errorMsg = JSON.stringify(errorMsg);
        } catch (e) {
          errorMsg = '错误无法解析';
        }
      }

      let errorLog = {
        errorType: 'customize',
        errorMsg: 'Customize Error: ' + errorMsg,
        lineNumber: lineNumber,
        columnNumber: columnNumber
      };
      errorLog = new Log(
        tracker.trackerOptions,
        'Error Log',
        errorLog,
        tracker.sessionId,
        tracker.trackerOptions.customizeErrorLog(error)
      );
      tracker.logList.push(errorLog);

      console.debug('Error Traking Log:\n', errorLog);
    } else {
      let errorLog = {
        errorType: 'js',
        errorMsg: errorMsg,
        lineNumber: lineNumber,
        columnNumber: columnNumber
      };
      errorLog = new Log(
        tracker.trackerOptions,
        'Error Log',
        errorLog,
        tracker.sessionId,
        tracker.trackerOptions.customizeErrorLog(error)
      );
      tracker.logList.push(errorLog);

      console.debug('Error Traking Log:\n', errorLog);
    }
    return oldError.apply(console, arguments);
  };
}

function handleErrorEvent(tracker) {
  // 重写 onerror 进行jsError的监听
  window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObj) {
    const errorStack = errorObj ? errorObj.stack : null;

    let errorLog = {
      errorType: 'window.onerror',
      errorMsg: errorMsg,
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      errorStack: errorStack
    };
    errorLog = new Log(
      tracker.trackerOptions,
      'Error Log',
      errorLog,
      tracker.sessionId,
      tracker.trackerOptions.customizeErrorLog(errorMsg)
    );
    tracker.logList.push(errorLog);

    console.debug('Error Traking Log:\n', errorLog);
  };

  window.onunhandledrejection = function (error) {
    let errorMsg = '';
    let errorStack = '';
    if (typeof error.reason === 'object') {
      errorMsg = error.reason.message;
      errorStack = error.reason.stack;
    } else {
      errorMsg = error.reason;
      errorStack = '';
    }

    let errorLog = {
      errorType: 'window.onunhandledrejection',
      errorMsg: errorMsg,
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      errorStack: errorStack
    };
    errorLog = new Log(
      tracker.trackerOptions,
      'Error Log',
      errorLog,
      tracker.sessionId,
      tracker.trackerOptions.customizeErrorLog(error)
    );
    tracker.logList.push(errorLog);

    console.debug('Error Traking Log:\n', errorLog);
  };
}
