/**
 * Tracker类的实现，我们所有的监控功能都集成此类中。
 * @author shadowingszy
 */
import { TrackerLog } from './log';
export interface ITrackerOptions {
    sessionId?: string;
    useClass?: boolean;
    maxResponseTextLength?: number;
    timeTracelInitTime?: number;
    timeTravelClickDelayTime?: number;
    timeTracelInputDelayTime?: number;
    captureEvent?: boolean;
    captureJsError?: boolean;
    captureXMLHttpRequest?: boolean;
    custom?: boolean;
    customizeLog?: (logType: any, logContent: any) => void;
    customizeEventLog?: (event: any) => void;
    customizeErrorLog?: (error: any) => void;
    customizeXMLHttpRequestLog?: (event: any) => void;
    customizeDeviceLog?: (userAgent: any) => void;
    customizePerformanceLog?: (performance: any) => void;
}
export declare class Tracker {
    trackerInitialized: boolean;
    trackerOptions: ITrackerOptions;
    logList: TrackerLog[];
    sessionId: string;
    constructor();
    init(options?: ITrackerOptions): Tracker;
    getDeviceInfo(insertIntoLogList?: boolean): TrackerLog;
    getPerformanceInfo(insertIntoLogList?: boolean): TrackerLog;
    getTimeTravelCode(): string;
    getTracker(): Tracker;
    getLogList(): TrackerLog[];
    addLog(log: TrackerLog): void;
    setLogList(logList: TrackerLog[]): void;
}
