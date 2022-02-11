/**
 * 这里提供了一些DOM操作的工具函数，主要是解决浏览器兼容性的问题。
 * @author shadowingszy
 */
/**
 * 此函数用于输出当前dom的唯一路径
 * @param {*} element   dom元素
 * @param {*} useClass  是否使用class作为描述
 */
export declare function getDomPath(element: EventTarget, useClass?: boolean): string;
/**
 * 获取当前DOM的tagName以及class组成DOM的唯一描述
 * @param {*} element   dom元素
 * @param {*} useClass  是否使用class作为描述
 */
export declare function getDomDesc(element: HTMLElement, useClass?: boolean): string;
/**
 * 兼容原生querySelector方法
 * @param {*} queryString   选择器字符串
 */
export declare function querySelector(queryString: string): HTMLElement;
/**
 * 获取当前element的width和height
 * @param {*} element   目标对象
 */
export declare function getBoundingClientRect(element: EventTarget): {
    width: number;
    height: number;
    left: number;
    top: number;
};
