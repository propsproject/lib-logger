declare class AppLogger {
    static getInstance(): any;
    static loggerCast(val: any, type: any): any;
    static info(_msg: string, _topic: string, _subTopic: string, _appLevel: number, _userId?: number, _roomId?: number, _extraObj?: any, _err?: any, _req?: any, _url?: string, _resSource?: object): void;
    static error(_msg: string, _topic: string, _subTopic: string, _appLevel: number, _userId?: number, _roomId?: number, _extraObj?: any, _err?: any, _req?: any, _url?: string, _resSource?: object): void;
    static log(msg: string, topic: string, owner: string, appLevel: number, userId?: number, roomId?: number, extraObj?: any, err?: any, url?: string): void;
}
export { AppLogger as default };
