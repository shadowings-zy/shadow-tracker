import { getSessionMap, getUserMap, mapToArray } from './util/common';
import { handleCustomLogByKeys } from './util/custom';
import { handleDeviceInfo } from './util/device';
import { handleOverviewInfo } from './util/overview';
import { handlePerformanceInfo } from './util/performance';
import { handleUrlStatisticInfo } from './util/urlStatistic';

const DEFAULT_ANALYZER_OPTIONS = {
  maxLogListLength: 50000,
  jumpOutTimeLimit: 30 * 1000
};

interface IAnalyzerOptions {
  maxLogListLength?: number;
  jumpOutTimeLimit?: number;
}

export interface Log {
  logTime: number;
  url: string;
  logType: string;
  logKey: string;
  logContent: any;
  logSession: string;
  logUser: string;
  custom?: {
    log: any;
    detail: any;
  };
}

export class ShadowTrackerAnalyzer {
  analyzerOptions: IAnalyzerOptions;
  sortedLogList: Log[];
  sessionMap: Map<string, Log[]>;
  userMap: Map<string, Log[]>;

  constructor(options: IAnalyzerOptions) {
    this.analyzerOptions = Object.assign(DEFAULT_ANALYZER_OPTIONS, options);
    this.sortedLogList = [];
    this.sessionMap = new Map<string, Log[]>();
    this.userMap = new Map<string, Log[]>();
  }

  addLog(inputLog: Log | Log[]) {
    const currentLength = this.sortedLogList.length;
    if (Array.isArray(inputLog)) {
      if (currentLength + inputLog.length > this.analyzerOptions.maxLogListLength) {
        throw Error('Too much log! Please split them!');
      }
      this.sortedLogList.push(...inputLog);
    } else {
      if (currentLength + 1 > this.analyzerOptions.maxLogListLength) {
        throw Error('Too much log! Please split them!');
      }
      this.sortedLogList.push(inputLog);
    }

    // 根据时间排序并生成sessionMap和userMap
    this.sortedLogList.sort((a, b) => a.logTime - b.logTime);
    this.sessionMap = getSessionMap(this.sortedLogList);
    this.userMap = getUserMap(this.sortedLogList);
  }

  getOverview() {
    const { pv, uv, jumpOutRate, averageVisitTime } = handleOverviewInfo(
      this.sessionMap,
      this.userMap,
      this.analyzerOptions.jumpOutTimeLimit
    );

    return {
      pv,
      uv,
      jumpOutRate,
      averageVisitTime
    };
  }

  getUrlStatisticInfo() {
    const urlMap = handleUrlStatisticInfo(this.sessionMap);
    return mapToArray(urlMap, 'url', 'visitNumber');
  }

  getDeviceInfo() {
    const { screenMap, clientMap, browserMap } = handleDeviceInfo(this.sessionMap);

    return {
      screenInfo: mapToArray(screenMap, 'info', 'number'),
      clientInfo: mapToArray(clientMap, 'info', 'number'),
      browserInfo: mapToArray(browserMap, 'info', 'number')
    };
  }

  getPerformanceInfo() {
    return handlePerformanceInfo(this.sessionMap);
  }

  getCustomLogByKeys(keys: string[]) {
    return handleCustomLogByKeys(this.sessionMap, keys);
  }
}
