/**
 * AJAX请求模块
 * 包含了对XMLHttpRequest和fetch的封装
 * @author shadowingszy
 */

import { LOG_KEY, LOG_TYPE, TrackerLog } from '../core/log';
import { Tracker } from '../core/tracker';

const oldXMLHttpRequestOpen = window.XMLHttpRequest.prototype.open;

export function captureXMLHttpRequest(tracker: Tracker) {
  XMLHttpRequest.prototype.open = function () {
    const requestStartTime = Date.now();
    oldXMLHttpRequestOpen.apply(this, arguments);

    try {
      this.addEventListener('load', function () {
        const requestFinishTime = Date.now();

        const loadEndLog = {
          event: 'XMLHttpRequest',
          status: this.status,
          duration: requestFinishTime - requestStartTime,
          url: this.responseURL,
          response: this.responseText
            .toString()
            .substring(0, tracker.trackerOptions.maxResponseTextLength)
        };
        const xmlHttpRequestLog = new TrackerLog(
          tracker.trackerOptions,
          LOG_TYPE.REQUEST,
          LOG_KEY.REQUEST,
          loadEndLog,
          tracker.trackerOptions.customizeXMLHttpRequestLog(event)
        );
        tracker.addLog(xmlHttpRequestLog);

        console.debug('capture xml http request log:\n', xmlHttpRequestLog);
      });
    } catch (e) {
      console.debug('capture xml http request error:\n', e);
    }
  };
}

const oldFetch = window.fetch;

export function captureFetch(tracker: Tracker) {
  window.fetch = function () {
    const requestStartTime = Date.now();
    const fetchPromise = oldFetch.apply(this, arguments);

    try {
      const onResolve = async function (response: Response) {
        const requestFinishTime = Date.now();

        response
          .clone()
          .text()
          .then(function (responseText) {
            const loadEndLog = {
              event: 'fetch',
              status: response.status,
              duration: requestFinishTime - requestStartTime,
              url: response.url,
              response: responseText
                .toString()
                .substring(0, tracker.trackerOptions.maxResponseTextLength)
            };
            const fetchLog = new TrackerLog(
              tracker.trackerOptions,
              LOG_TYPE.REQUEST,
              LOG_KEY.REQUEST,
              loadEndLog,
              tracker.trackerOptions.customizeXMLHttpRequestLog(response)
            );
            tracker.addLog(fetchLog);

            console.debug('capture fetch log:\n', fetchLog);
          });
      };

      const onReject = function () {
        const requestFinishTime = Date.now();

        const loadEndLog = {
          event: 'fetchReject',
          duration: requestFinishTime - requestStartTime
        };
        const fetchLog = new TrackerLog(
          tracker.trackerOptions,
          LOG_TYPE.REQUEST,
          LOG_KEY.REQUEST,
          loadEndLog
        );
        tracker.addLog(fetchLog);

        console.debug('capture fetch log:\n', fetchLog);
      };

      fetchPromise.then(onResolve, onReject);
    } catch (e) {
      console.debug('capture fetch error:\n', e);
    }

    return fetchPromise;
  };
}

async function getText(response: Response) {
  return await response.clone().text();
}
