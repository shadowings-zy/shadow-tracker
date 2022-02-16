import { Log } from "../analyzer";

export const getSessionMap = (logList: Log[]) => {
  const sessionMap = new Map<string, Log[]>();

  for (const log of logList) {
    if (log.logSession !== undefined) {
      const currentSessionLogList = sessionMap.get(log.logSession);

      if (currentSessionLogList !== undefined) {
        sessionMap.set(log.logSession, [...currentSessionLogList, log]);
      } else {
        sessionMap.set(log.logSession, [log]);
      }
    }
  }

  return sessionMap;
};

export const getUserMap = (logList: Log[]) => {
  const userMap = new Map<string, Log[]>();

  for (const log of logList) {
    if (log.logUser !== undefined) {
      const currentUserLogList = userMap.get(log.logUser);

      if (currentUserLogList !== undefined) {
        userMap.set(log.logSession, [...currentUserLogList, log]);
      } else {
        userMap.set(log.logSession, [log]);
      }
    }
  }

  return userMap;
};

export const addCount = (targetMap: Map<string, number>, key: string) => {
  const currentCount = targetMap.get(key);
  if (currentCount !== undefined) {
    targetMap.set(key, currentCount + 1);
  } else {
    targetMap.set(key, 1);
  }
  return targetMap;
};

export const mapToArray = (map: Map<string, number>, keyName: string, valueName: string) => {
  const output = [];
  map.forEach((value, key) => {
    output.push({
      [keyName]: key,
      [valueName]: value
    });
  });
  return output
};
