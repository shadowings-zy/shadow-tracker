import { TrackerLog } from '../../../tracker/src/core/log';

export const handlePerformanceInfo = (sessionMap: Map<string, TrackerLog[]>) => {
  const output = {
    cacheTime: 0,
    connectTime: 0,
    domReadyTime: 0,
    domainLookupTime: 0,
    loadEventTime: 0,
    loadPageTime: 0,
    redirectTime: 0,
    requestTime: 0,
    timeToFirstByte: 0,
    unloadTime: 0
  };

  const performanceKey = [
    'cacheTime',
    'connectTime',
    'domReadyTime',
    'domainLookupTime',
    'loadEventTime',
    'loadPageTime',
    'redirectTime',
    'requestTime',
    'timeToFirstByte',
    'unloadTime'
  ];
  let performanceLogNumber = 0;

  performanceKey.forEach((key) => {
    output[key] = 0;
  });

  sessionMap.forEach((logList) => {
    const sessionPerformanceLog = logList.filter((item) => item.logType === 'Performance Log');
    sessionPerformanceLog.forEach((performanceLog) => {
      const performanceLogContent = performanceLog.logContent;
      performanceKey.forEach((key) => {
        if (
          performanceLogContent &&
          Number.isInteger(performanceLogContent[key]) &&
          performanceLogContent[key] > 0
        ) {
          output[key] = output[key] + performanceLogContent[key];
        }
      });
    });
    performanceLogNumber = sessionPerformanceLog.length;
  });

  performanceKey.forEach((key) => {
    output[key] = output[key] / performanceLogNumber;
  });
  return output;
};
