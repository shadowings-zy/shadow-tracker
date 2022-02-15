import { TrackerLog } from '../../../tracker/src/core/log';

export const handleOverviewInfo = (
  sessionMap: Map<string, TrackerLog[]>,
  userMap: Map<string, TrackerLog[]>,
  jumpOutTimeLimit = 30 * 1000
) => {
  // 跳出率和平均访问计算
  let jumpOutNumber = 0;
  let sumVisitTime = 0;
  sessionMap.forEach((sortedLogList) => {
    const startTime = sortedLogList[0].logTime;
    const endTime = sortedLogList[sortedLogList.length - 1].logTime;
    const visitTime = endTime - startTime;
    if (visitTime < jumpOutTimeLimit) {
      jumpOutNumber = jumpOutNumber + 1;
    }
    sumVisitTime = sumVisitTime + visitTime;
  });

  return {
    pv: sessionMap.size,
    uv: userMap.size,
    jumpOutRate: jumpOutNumber / sessionMap.size,
    averageVisitTime: Math.floor(sumVisitTime / sessionMap.size)
  };
};
