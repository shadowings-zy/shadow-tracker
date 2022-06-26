import { Log } from '../analyzer';

export const handleCustomLogByKeys = (sessionMap: Map<string, Log[]>, keys: string[]) => {
  const output = {};

  keys.forEach((key) => {
    output[key] = [];
  });

  sessionMap.forEach((logList, sessionKey) => {
    const sessionCustomLog = logList.filter((item) => item.logType === 'Custom Log');
    sessionCustomLog.forEach((customLog) => {
      if (keys.includes(customLog.logKey)) {
        output[customLog.logKey].push(customLog);
      }
    });
  });

  return output;
};
