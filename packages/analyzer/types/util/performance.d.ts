import { Log } from "../analyzer";
export declare const handlePerformanceInfo: (sessionMap: Map<string, Log[]>) => {
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
