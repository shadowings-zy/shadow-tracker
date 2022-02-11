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
  PERFORMANCE = 'Performance Log'
}

export interface ICustomLog {
  log: any;
  detail: any;
}

export class TrackerLog {
  logTime: number;
  url: string;
  logType: LOG_TYPE;
  logContent: any;
  logSession: string;
  custom: ICustomLog | undefined;

  constructor(
    options: ITrackerOptions,
    logType: LOG_TYPE,
    logContent: any,
    customizeDetailData?: any
  ) {
    this.logTime = new Date().getTime();
    this.url = window.location.href;
    this.logType = logType;
    this.logContent = logContent;
    this.logSession = options.sessionId;
    if (options.custom) {
      this.custom = {
        log: options.customizeLog(logType, logContent),
        detail: customizeDetailData
      };
    }
  }
}
