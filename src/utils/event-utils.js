/**
 * 这里提供了一些Event操作的工具函数，主要是解决浏览器兼容性的问题。
 * @author shadowingszy
 */

/**
 * 获取到window中的event对象
 * @param {*} event event对象
 */
export function getEvent(event) {
  event = event || window.event;
  if (!event) {
    return event;
  }
  if (!event.target) {
    event.target = event.srcElement;
  }
  if (!event.currentTarget) {
    event.currentTarget = event.srcElement;
  }
  return event;
}

/**
 * 生成eventListener的方法。
 */
export function getEventListenerMethod() {
  let addMethod = 'addEventListener';
  let removeMethod = 'removeEventListener';
  let prefix = '';

  if (!window.addEventListener) {
    addMethod = 'attachEvent';
    removeMethod = 'detachEvent';
    prefix = 'on';
  }
  return {
    addMethod,
    removeMethod,
    prefix
  };
}
