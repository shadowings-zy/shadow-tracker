/**
 * 监控用户设备信息的模块
 * @author shadowingszy
 *
 * 使用user-agent获取用户设备信息
 */

import Log from './log';

export function captureDeviceInfo(tracker) {
  const deviceData = getDevice();
  const deviceLog = new Log(
    tracker.trackerOptions,
    'Device Log',
    deviceData,
    tracker.sessionId,
    tracker.trackerOptions.customizeDeviceLog(navigator.userAgent)
  );
  tracker.logList.push(deviceLog);

  console.debug('Device Traking Log:\n', deviceLog);
}

function getDevice() {
  const userAgent = navigator.userAgent;
  let device = {
    browser: false,
    mobile: false,
    type: 'unknown', // 可选项有：computer, ios, android, wechat, windows phone, unknow
    version: 'unknown', // 版本号
    name: 'unknown', // 可选项有：msie, firefox, chrome, sarfari, android, ios, unknown
    userAgent: navigator.userAgent
  };

  if (userAgent.indexOf('Mobile') === -1) {
    let browserInfo = getBrowserInfo(userAgent);
    device = Object.assign(device, browserInfo);
    device.browser = true;
    device.type = 'computer';
  } else {
    let mobileInfo = getMobileInfo(userAgent);
    device = Object.assign(device, mobileInfo);
    device.mobile = true;
  }

  return device;
}

/**
 * 获取浏览器的信息
 * @param {*} userAgent
 */
function getBrowserInfo(userAgent) {
  const deviceOutput = {
    name: 'unknown',
    version: 'unknown'
  };

  const agent = userAgent.toLowerCase();
  const ieRegExp = /msie [\d.]+/gi;
  const edgeRegExp = /edge\/[\d.]+/gi;
  const firefoxRegExp = /firefox\/[\d.]+/gi;
  const chromeRegExp = /chrome\/[\d.]+/gi;
  const sarfariRegExp = /safari\/[\d.]+/gi;

  // ie
  if (agent.indexOf('msie') > 0) {
    const browserInfo = agent.match(ieRegExp)[0];
    deviceOutput.name = browserInfo.split('/')[0];
    deviceOutput.version = browserInfo.split('/')[1];
  }
  // edge
  if (agent.indexOf('edge') > 0) {
    const browserInfo = agent.match(edgeRegExp)[0];
    deviceOutput.name = browserInfo.split('/')[0];
    deviceOutput.version = browserInfo.split('/')[1];
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    const browserInfo = agent.match(firefoxRegExp)[0];
    deviceOutput.name = browserInfo.split('/')[0];
    deviceOutput.version = browserInfo.split('/')[1];
  }

  // 由于safari浏览器中的useragent无chrome字段，而chrome浏览器中的useragent有chrome字段，所以这里要区分一下
  // safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    const browserInfo = agent.match(sarfariRegExp)[0];
    deviceOutput.name = browserInfo.split('/')[0];
    deviceOutput.version = browserInfo.split('/')[1];
  }
  // chrome
  if (agent.indexOf('chrome') > 0) {
    const browserInfo = agent.match(chromeRegExp)[0];
    deviceOutput.name = browserInfo.split('/')[0];
    deviceOutput.version = browserInfo.split('/')[1];
  }

  return deviceOutput;
}

/**
 * 获取移动终端信息
 * @param {*} userAgent
 */
function getMobileInfo(userAgent) {
  const deviceOutput = {
    type: 'unknown',
    version: 'unknown',
    name: 'unknown',
    isWebView: false
  };

  const matchAndroid = userAgent.match(/(Android)?[\s/]+([\d.]+)?/);
  const matchIpad = userAgent.match(/(iPad).*OS\s([\d_]+)/);
  const matchIpod = userAgent.match(/(iPod)(.*OS\s([\d_]+))?/);
  const matchIphone = !matchIpad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
  const isWeChat = /MicroMessenger/i.test(userAgent);
  const isWindowsMobile = /windows mobile/i.test(userAgent);

  // Android
  if (matchAndroid) {
    deviceOutput.type = 'android';
    deviceOutput.version = matchAndroid[2];
    const androidDetail = userAgent.match(/Android\s[\S\s]+Build\//);
    if (androidDetail) {
      const deviceName = androidDetail[0].split(';')[1].replace(/Build\//g, '');
      deviceOutput.name = deviceName.replace(/(^\s*)|(\s*$)/g, '');
    }
  }

  // iOS
  if (matchIpad || matchIpod || matchIphone) {
    deviceOutput.type = 'ios';

    if (matchIpad) {
      deviceOutput.version = matchIpad[2].replace(/_/g, '.');
      deviceOutput.name = 'ipad';
    }

    if (matchIpod) {
      deviceOutput.version = matchIpod[3] ? matchIpod[3].replace(/_/g, '.') : 'unknown';
      deviceOutput.name = 'ipod';
    }

    if (matchIphone) {
      deviceOutput.version = matchIphone[2].replace(/_/g, '.');
      deviceOutput.name = 'iphone';
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      if (screenWidth === 320 && screenHeight === 480) {
        deviceOutput.name = 'iphone 4';
      } else if (screenWidth === 320 && screenHeight === 568) {
        deviceOutput.name = 'iphone 5/SE';
      } else if (screenWidth === 375 && screenHeight === 667) {
        deviceOutput.name = 'iphone 6/7/8';
      } else if (screenWidth === 414 && screenHeight === 736) {
        deviceOutput.name = 'iphone 6/7/8 Plus';
      } else if (screenWidth === 375 && screenHeight === 812) {
        deviceOutput.name = 'iphone X/S/Max';
      }
    }

    // iOS 8+ 的 userAgent 与之前的版本不同
    if (userAgent.indexOf('Version/') >= 0 && deviceOutput.osVersion.split('.')[0] === '10') {
      deviceOutput.version = userAgent.toLowerCase().split('version/')[1].split(' ')[0];
    }

    // 判断是否为iOS webview
    deviceOutput.isWebView = /.*AppleWebKit(?!.*Safari)/i.test(userAgent);
  }

  if (isWeChat) {
    deviceOutput.type = 'wechat';
  }

  if (isWindowsMobile) {
    deviceOutput.type = 'windows mobile';
  }

  return deviceOutput;
}
