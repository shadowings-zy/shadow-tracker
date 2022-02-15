import { TrackerLog } from '../../../tracker/src/core/log';
export declare const getOverview: (sessionMap: Map<string, TrackerLog[]>, userMap: Map<string, TrackerLog[]>, jumpOutTimeLimit?: number) => {
    pv: number;
    uv: number;
    jumpOutRate: number;
    averageVisitTime: number;
};
