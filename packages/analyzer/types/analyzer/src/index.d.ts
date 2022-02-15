import { TrackerLog } from '../../tracker/src/core/log';
interface IAnalyzerOptions {
    maxLogListLength?: number;
    jumpOutTimeLimit?: number;
}
export declare class ShadowTrackerAnalyzer {
    analyzerOptions: IAnalyzerOptions;
    sortedLogList: TrackerLog[];
    sessionMap: Map<string, TrackerLog[]>;
    userMap: Map<string, TrackerLog[]>;
    constructor(options: IAnalyzerOptions);
    addLog(inputLog: TrackerLog | TrackerLog[]): void;
    getOverview(): {
        pv: number;
        uv: number;
        jumpOutRate: number;
        averageVisitTime: number;
    };
    getUrlStatisticInfo(): {
        url: string;
        visitNumber: number;
        userActionNumber: number;
    }[];
    getDeviceInfo(): {
        screenInfo: {
            '1920x1080': number;
        };
        clientInfo: {
            '1920x1080': number;
        };
        browserInfo: {
            'chrome-computer': number;
            'uc-mobile': number;
        };
    };
    getPerformanceInfo(): {
        cacheTime: number;
        connectTime: number;
        domReadyTime: number;
        domainLookupTime: number;
        loadEventTime: number;
        loadPageTime: number;
        redirectTime: number;
        requestTime: number;
        timeToFirstByte: number;
        unloadTime: number;
    };
}
export {};
