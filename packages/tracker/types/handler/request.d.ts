/**
 * AJAX请求模块
 * 包含了对XMLHttpRequest和fetch的封装
 * @author shadowingszy
 */
import { Tracker } from '../core/tracker';
export declare function captureXMLHttpRequest(tracker: Tracker): void;
export declare function captureFetch(tracker: Tracker): void;
