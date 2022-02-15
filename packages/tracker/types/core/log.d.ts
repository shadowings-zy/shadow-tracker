/**
 * 日志类
 * @author shadowingszy
 */
import { ITrackerOptions } from './tracker';
export declare enum LOG_TYPE {
    EVENT = "Event Log",
    ERROR = "Error Log",
    REQUEST = "XMLHttpRequest Log",
    DEVICE = "Device Log",
    PERFORMANCE = "Performance Log"
}
export interface ICustomLog {
    log: any;
    detail: any;
}
export declare class TrackerLog {
    logTime: number;
    url: string;
    logType: LOG_TYPE;
    logContent: any;
    logSession: string;
    logUser: string;
    custom: ICustomLog | undefined;
    constructor(options: ITrackerOptions, logType: LOG_TYPE, logContent: any, customizeDetailData?: any);
}
