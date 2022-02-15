import { getBoundingClientRect, getDomPath } from './dom';

/**
 * 处理DOM节点，生成此节点的唯一路径
 * @param {*} event
 */
export function handleDomPathTrack(event: MouseEvent | KeyboardEvent, useClass: boolean) {
  const domPath = getDomPath(event.target, useClass);
  return {
    domPath: domPath,
    trackingType: event.type
  };
}

/**
 * 生成点击的相对位置
 * @param {*} event
 */
export function handlePositionTrack(event: MouseEvent) {
  const rect = getBoundingClientRect(event.target);
  if (rect.width === 0 || rect.height === 0) {
    return;
  }
  if (event.pageX !== undefined || event.clientX !== undefined) {
    let element = document.documentElement || (document.body.parentNode as HTMLElement);
    const scrollX = (element && typeof element.scrollLeft == 'number' ? element : document.body)
      .scrollLeft;
    const scrollY = (element && typeof element.scrollTop == 'number' ? element : document.body)
      .scrollTop;
    const pageX = event.pageX || event.clientX + scrollX;
    const pageY = event.pageY || event.clientY + scrollY;
    return {
      offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
      offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6)
    };
  }
}

/**
 * 获取当前输入的值
 * @param {*} event
 */
export function handleInputTrack(event: KeyboardEvent) {
  if (event.key !== undefined && event.target !== undefined) {
    return {
      inputKey: event.key,
      currentValue: (event.target as HTMLInputElement).value
    };
  }
}
