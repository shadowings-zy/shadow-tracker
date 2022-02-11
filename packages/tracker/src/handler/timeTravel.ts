/**
 * 时间旅行模块，用于生成NightWatch代码
 * @author shadowingszy
 */

import { LOG_TYPE, TrackerLog } from '../core/log';

/**
 * 根据用户操作列表生成NightWatch的e2e测试代码
 * @param {*} logList 日志列表
 * @param {*} initTime 初始化NightWatch的时间
 * @param {*} clickTime 点击时间
 * @param {*} inputTime 输入时间
 */
export function generateTimeTravelCode(
  logList: TrackerLog[],
  initTime: number,
  clickDelayTime: number,
  inputDelayTime: number
) {
  const userOperationList = getUserOperationList(logList);
  if (userOperationList.length > 0) {
    const mergedOperationList = mergeKeyDown(userOperationList);
    let currentTime = mergedOperationList[0].logTime;
    let nightWatchCode = `function test(browser) {\nbrowser\n.url(${mergedOperationList[0].url}).pause(${initTime})\n`;
    for (let a = 0; a < mergedOperationList.length; a++) {
      const trackData = mergedOperationList[a];
      const trackLogContent = trackData.logContent;

      let nextTime = 0;
      if (a + 1 !== mergedOperationList.length) {
        nextTime = mergedOperationList[a + 1].logTime - currentTime;
      }

      if (trackLogContent.trackingType === 'mousedown') {
        nightWatchCode += `.assert.elementPresent("${trackLogContent.domPath}")\n`;
        nightWatchCode += `.click("${trackLogContent.domPath}").pause(${
          nextTime + clickDelayTime
        })\n`;
        currentTime = trackData.logTime;
      } else if (trackLogContent.trackingType === 'keyup' && trackLogContent.finalInput) {
        nightWatchCode += `.setValue("${trackLogContent.domPath}", "${
          trackLogContent.currentValue
        }").pause(${nextTime + inputDelayTime})\n`;
        currentTime = trackData.logTime;
      }
    }
    nightWatchCode = `${nightWatchCode}}`;

    return nightWatchCode;
  } else {
    return '';
  }
}

/**
 * 根据logList获取event list
 * @param {*} logList
 */
function getUserOperationList(logList: TrackerLog[]) {
  const output = [];
  for (const item of logList) {
    if (item.logType === LOG_TYPE.EVENT) {
      output.push(item);
    }
  }
  return output;
}

/**
 * 合并连续的input操作
 * @param {*} userOperationList
 */
function mergeKeyDown(userOperationList: TrackerLog[]) {
  for (let a = 0; a < userOperationList.length - 1; a++) {
    const isFinalInput =
      (userOperationList[a].logContent.trackingType === 'keyup' &&
        userOperationList[a + 1].logContent.trackingType !== 'keyup') ||
      (userOperationList[a].logContent.trackingType === 'keyup' &&
        userOperationList[a + 1].logContent.trackingType === 'keyup' &&
        userOperationList[a].logContent.domPath !== userOperationList[a + 1].logContent.domPath);
    if (isFinalInput) {
      userOperationList[a].logContent.finalInput = true;
    }
  }

  // 对数组中最后一项单独处理
  if (userOperationList.length > 1) {
    const lastItem = userOperationList[userOperationList.length - 1].logContent;
    const previousLastItem = userOperationList[userOperationList.length - 2].logContent;
    const flag =
      lastItem.trackingType === 'keyup' &&
      previousLastItem.trackingType === 'keyup' &&
      lastItem.domPath === previousLastItem.domPath;
    if (flag) {
      userOperationList[userOperationList.length - 1].logContent.finalInput = true;
    }
  } else if (userOperationList.length === 1) {
    const lastItem = userOperationList[userOperationList.length - 1].logContent;
    if (lastItem.trackingType === 'keyup') {
      userOperationList[userOperationList.length - 1].logContent.finalInput = true;
    }
  }

  return userOperationList;
}
