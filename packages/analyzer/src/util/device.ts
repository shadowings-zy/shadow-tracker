import { Log } from '../analyzer';
import { addCount } from './common';

export const handleDeviceInfo = (sessionMap: Map<string, Log[]>) => {
  let screenMap = new Map<string, number>();
  let clientMap = new Map<string, number>();
  let browserMap = new Map<string, number>();
  sessionMap.forEach((logList) => {
    const sessionDeviceLog = logList.filter((item) => item.logType === 'Device Log');

    for (const deviceLog of sessionDeviceLog) {
      const { screenHeight, screenWidth, clientHeight, clientWidth, name, type } =
        deviceLog.logContent;

      const screenType = generateScreenType(screenWidth, screenHeight);
      const clientType = generateClientType(clientWidth, clientHeight);
      const browserType = generateBrowserType(name, type);

      screenMap = addCount(screenMap, screenType);
      clientMap = addCount(clientMap, clientType);
      browserMap = addCount(browserMap, browserType);
    }
  });

  return {
    screenMap,
    clientMap,
    browserMap
  };
};

const generateScreenType = (screenWidth: number, screenHeight: number) => {
  if (screenWidth && screenHeight) {
    return `${screenWidth}x${screenHeight}`;
  }
  return 'unknown';
};

const generateClientType = (clientWidth: number, clientHeight: number) => {
  if (clientWidth && clientHeight) {
    return `${clientWidth}x${clientHeight}`;
  }
  return 'unknown';
};

const generateBrowserType = (name: string, type: string) => {
  if (name && type) {
    return `${name}(${type})`;
  }
  return 'unknown';
};
