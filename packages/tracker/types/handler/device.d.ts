/**
 * 监控用户设备信息的模块
 * @author shadowingszy
 *
 * 使用user-agent获取用户设备信息
 */
import { TrackerLog } from '../core/log';
import { ITrackerOptions } from '../core/tracker';
export declare function captureDeviceInfo(trackerOptions: ITrackerOptions): TrackerLog | undefined;
