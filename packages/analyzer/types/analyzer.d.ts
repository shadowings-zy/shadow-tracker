interface IAnalyzerOptions {
    maxLogListLength?: number;
    jumpOutTimeLimit?: number;
}
export interface Log {
    logTime: number;
    url: string;
    logType: string;
    logContent: any;
    logSession: string;
    logUser: string;
    custom?: {
        log: any;
        detail: any;
    };
}
export declare class ShadowTrackerAnalyzer {
    analyzerOptions: IAnalyzerOptions;
    sortedLogList: Log[];
    sessionMap: Map<string, Log[]>;
    userMap: Map<string, Log[]>;
    constructor(options: IAnalyzerOptions);
    addLog(inputLog: Log | Log[]): void;
    getOverview(): {
        pv: number;
        uv: number;
        jumpOutRate: number;
        averageVisitTime: number;
    };
    getUrlStatisticInfo(): any[];
    getDeviceInfo(): {
        screenInfo: any[];
        clientInfo: any[];
        browserInfo: any[];
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
