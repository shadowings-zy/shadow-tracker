/**
 * Tracker类的实现，我们所有的监控功能都集成此类中。
 * @author shadowingszy
 */

import { captureDeviceInfo } from '../handler/device';
import { capturePerformance } from '../handler/performance';
import { captureEvent } from '../handler/event';
import { captureJsError } from '../handler/jsError';
import { generateTimeTravelCode } from '../handler/timeTravel';
import { TrackerLog } from './log';
import { captureFetch, captureXMLHttpRequest } from '../handler/request';

export interface ITrackerOptions {
  sessionId?: string;
  userId?: string;
  useClass?: boolean;
  maxResponseTextLength?: number;
  timeTracelInitTime?: number;
  timeTravelClickDelayTime?: number;
  timeTracelInputDelayTime?: number;
  captureEvent?: boolean;
  captureJsError?: boolean;
  captureXMLHttpRequest?: boolean;
  custom?: boolean;
  customizeLog?: (logType, logContent) => void;
  customizeEventLog?: (event) => void;
  customizeErrorLog?: (error) => void;
  customizeXMLHttpRequestLog?: (event) => void;
  customizeDeviceLog?: (userAgent) => void;
  customizePerformanceLog?: (performance) => void;
}

const DEFAULT_OPTIONS: ITrackerOptions = {
  sessionId: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
  userId: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
  useClass: false,
  maxResponseTextLength: 1000,
  timeTracelInitTime: 3000,
  timeTravelClickDelayTime: 1000,
  timeTracelInputDelayTime: 1000,
  captureEvent: true,
  captureJsError: true,
  captureXMLHttpRequest: true,
  custom: false,
  customizeLog: function (logType, logContent) {},
  customizeEventLog: function (event) {},
  customizeErrorLog: function (error) {},
  customizeXMLHttpRequestLog: function (event) {},
  customizeDeviceLog: function (userAgent) {},
  customizePerformanceLog: function (performance) {}
};

export class Tracker {
  trackerInitialized: boolean; // tracker是否已经初始化，使tracker成为单例
  trackerOptions: ITrackerOptions; // tracker的设置
  logList: TrackerLog[]; // 日志列表
  sessionId: string; // 日志sessionId
  userId: string; // 日志userId

  constructor() {
    this.trackerInitialized = false;
    this.trackerOptions = DEFAULT_OPTIONS;
    this.logList = [];
    this.sessionId = '';
    this.userId = '';
  }

  init(options: ITrackerOptions = {}): Tracker {
    this.trackerOptions = Object.assign(DEFAULT_OPTIONS, options);
    this.sessionId = this.trackerOptions.sessionId;
    this.userId = this.trackerOptions.userId;

    if (!this.trackerInitialized) {
      if (this.trackerOptions.captureEvent) {
        captureEvent(this);
      }
      if (this.trackerOptions.captureJsError) {
        captureJsError(this);
      }
      if (this.trackerOptions.captureXMLHttpRequest) {
        captureXMLHttpRequest(this);
        captureFetch(this);
      }
      this.trackerInitialized = true;
    }
    return this;
  }

  getDeviceInfo(insertIntoLogList: boolean = true) {
    const deviceInfoLog = captureDeviceInfo(this.trackerOptions);

    if (insertIntoLogList) {
      this.logList.push(deviceInfoLog);
    }

    return deviceInfoLog;
  }

  getPerformanceInfo(insertIntoLogList: boolean = true): TrackerLog {
    const performanceLog = capturePerformance(this.trackerOptions);

    if (insertIntoLogList) {
      this.logList.push(performanceLog);
    }

    return performanceLog;
  }

  getTimeTravelCode(): string {
    const timeTravelCode = generateTimeTravelCode(
      this.logList,
      this.trackerOptions.timeTracelInitTime,
      this.trackerOptions.timeTravelClickDelayTime,
      this.trackerOptions.timeTracelInputDelayTime
    );
    return timeTravelCode;
  }

  getTracker(): Tracker {
    return this;
  }

  getLogList(): TrackerLog[] {
    return this.logList;
  }

  addLog(log: TrackerLog) {
    this.logList.push(log);
  }

  setLogList(logList: TrackerLog[]) {
    this.logList = logList;
  }
}
