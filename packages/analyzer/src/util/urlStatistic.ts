import { TrackerLog } from '../../../tracker/src/core/log';
import { addCount } from './common';

export const handleUrlStatisticInfo = (sessionMap: Map<string, TrackerLog[]>) => {
  let urlMap = new Map<string, number>();
  sessionMap.forEach((logList) => {
    const sessionUrlChangeLog = logList.filter(
      (item) => item.logType === 'Event Log' && item.logContent.trackingType === 'urlchange'
    );

    for (let a = 0; a < sessionUrlChangeLog.length; a++) {
      const { oldUrl, newUrl } = sessionUrlChangeLog[a].logContent;

      // 第一个urlChangeLog的oldUrl也要计算才行
      if (a === 0) {
        urlMap = addCount(urlMap, oldUrl);
      }
      urlMap = addCount(urlMap, newUrl);
    }
  });

  return urlMap;
};
