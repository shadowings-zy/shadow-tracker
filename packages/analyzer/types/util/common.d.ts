import { Log } from "../analyzer";
export declare const getSessionMap: (logList: Log[]) => Map<string, Log[]>;
export declare const getUserMap: (logList: Log[]) => Map<string, Log[]>;
export declare const addCount: (targetMap: Map<string, number>, key: string) => Map<string, number>;
export declare const mapToArray: (map: Map<string, number>, keyName: string, valueName: string) => any[];
