/**
 * 这里提供了一些DOM操作的工具函数，主要是解决浏览器兼容性的问题。
 * @author shadowingszy
 */

/**
 * 此函数用于输出当前dom的唯一路径
 * @param {*} element   dom元素
 * @param {*} useClass  是否使用class作为描述
 */
export function getDomPath(element, useClass = false) {
  if (!(element instanceof HTMLElement)) {
    console.warn('input element is not a HTML element!')
    return ''
  }
  let domPath = []
  let elem = element
  while (elem) {
    let domDesc = getDomDesc(elem, useClass)
    if (!domDesc) {
      break
    }
    domPath.unshift(domDesc)
    if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
      break
    }
    domPath.shift()
    const children = elem.parentNode.children
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === elem) {
          domDesc += `:nth-child(${i + 1})`
          break
        }
      }
    }
    domPath.unshift(domDesc)
    if (querySelector(domPath.join('>')) === element) {
      break
    }
    elem = elem.parentNode
  }
  return domPath.join('>')
}

/**
 * 获取当前DOM的tagName以及class组成DOM的唯一描述
 * @param {*} element   dom元素
 * @param {*} useClass  是否使用class作为描述
 */
export function getDomDesc(element, useClass = false) {
  const domDesc = []
  if (!element || !element.tagName) {
    return ''
  }
  if (element.id) {
    return `#${element.id}`
  }
  domDesc.push(element.tagName.toLowerCase())
  if (useClass) {
    const className = element.className
    if (className && typeof className === 'string') {
      const classes = className.split(/\s+/)
      domDesc.push(`.${classes.join('.')}`)
    }
  }
  if (element.name) {
    domDesc.push(`[name=${element.name}]`)
  }
  return domDesc.join('')
}

/**
 * 兼容原生querySelector方法
 * @param {*} queryString   选择器字符串
 */
export function querySelector(queryString) {
  return document.getElementById(queryString) || document.getElementsByName(queryString)[0] || document.querySelector(queryString)
}

/**
 * 获取当前element的width和height
 * @param {*} element   目标对象
 */
export function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect()
  return {
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    left: rect.left || 0,
    top: rect.top || 0
  }
}