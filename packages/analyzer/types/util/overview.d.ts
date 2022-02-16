import { Log } from "../analyzer";
export declare const handleOverviewInfo: (sessionMap: Map<string, Log[]>, userMap: Map<string, Log[]>, jumpOutTimeLimit?: number) => {
    pv: number;
    uv: number;
    jumpOutRate: number;
    averageVisitTime: number;
};
