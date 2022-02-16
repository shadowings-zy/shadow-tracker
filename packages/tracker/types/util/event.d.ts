/**
 * 处理DOM节点，生成此节点的唯一路径
 * @param {*} event
 */
export declare function handleDomPathTrack(event: MouseEvent | KeyboardEvent, useClass: boolean): {
    domPath: string;
    trackingType: string;
};
/**
 * 生成点击的相对位置
 * @param {*} event
 */
export declare function handlePositionTrack(event: MouseEvent): {
    offsetX: string;
    offsetY: string;
};
/**
 * 获取当前输入的值
 * @param {*} event
 */
export declare function handleInputTrack(event: KeyboardEvent): {
    inputKey: string;
    currentValue: string;
};
