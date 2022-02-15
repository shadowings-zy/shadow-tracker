/**
 * 时间旅行模块，用于生成NightWatch代码
 * @author shadowingszy
 */
import { TrackerLog } from '../core/log';
/**
 * 根据用户操作列表生成NightWatch的e2e测试代码
 * @param {*} logList 日志列表
 * @param {*} initTime 初始化NightWatch的时间
 * @param {*} clickTime 点击时间
 * @param {*} inputTime 输入时间
 */
export declare function generateTimeTravelCode(logList: TrackerLog[], initTime: number, clickDelayTime: number, inputDelayTime: number): string;
