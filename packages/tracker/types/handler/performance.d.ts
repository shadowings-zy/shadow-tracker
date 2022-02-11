/**
 * 监控页面统计数据的模块
 * @author shadowingszy
 *
 * 使用performance API进行页面数据监控
 */
import { TrackerLog } from '../core/log';
import { ITrackerOptions } from '../core/tracker';
export interface IPerformanceData {
    loadPageTime?: number;
    domReadyTime?: number;
    redirectTime?: number;
    domainLookupTime?: number;
    timeToFirstByte?: number;
    requestTime?: number;
    loadEventTime?: number;
    cacheTime?: number;
    unloadTime?: number;
    connectTime?: number;
}
export declare function capturePerformance(trackerOptions: ITrackerOptions): TrackerLog | undefined;
