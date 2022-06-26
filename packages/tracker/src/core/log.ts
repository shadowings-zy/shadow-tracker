/**
 * 日志类
 * @author shadowingszy
 */

import { ITrackerOptions } from './tracker';

export enum LOG_TYPE {
  EVENT = 'Event Log',
  ERROR = 'Error Log',
  REQUEST = 'XMLHttpRequest Log',
  DEVICE = 'Device Log',
  PERFORMANCE = 'Performance Log',
  CUSTOM = 'Custom Log'
}

export enum LOG_KEY {
  EVENT = '__Event_Log',
  ERROR = '__Error_Log',
  REQUEST = '__XMLHttpRequest_Log',
  DEVICE = '__Device_Log',
  PERFORMANCE = '__Performance_Log'
}

export interface ICustomLog {
  log: any;
  detail: any;
}

export class TrackerLog {
  logTime: number;
  url: string;
  logType: LOG_TYPE;
  logKey: string;
  logContent: any;
  logSession: string;
  logUser: string;
  custom: ICustomLog | undefined;

  constructor(
    options: ITrackerOptions,
    logType: LOG_TYPE,
    logKey: string,
    logContent: any,
    customizeDetailData?: any
  ) {
    this.logTime = new Date().getTime();
    this.url = window.location.href;
    this.logType = logType;
    this.logKey = logKey;
    this.logContent = logContent;
    this.logSession = options.sessionId;
    this.logUser = options.userId;
    if (options.custom) {
      this.custom = {
        log: options.customizeLog(logType, logContent),
        detail: customizeDetailData
      };
    }
  }
}
