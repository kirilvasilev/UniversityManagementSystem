import { ILogger, LogLevel } from "./ILogger";

export class BaseLogger implements ILogger {
    log(message: any): void;
    log(message: any, controller: String, method: String): void;
    log(message: any, controller: String, method: String, level: LogLevel): void;
    log(message: any, controller?: any, method?: any, level?: any) {
        let msgColor: String;
        switch(+level)
        {
            case LogLevel.Information:
            msgColor = '\x1b[32m';
                break;
            case LogLevel.Warning:
            msgColor = '\x1b[33m';
                break;
            case LogLevel.Error:
            msgColor = '\x1b[31m';
                break;
            default:
            msgColor = '\x1b[32m';
                break;
        }
        console.log(`\x1b[35m${new Date().toUTCString()} \x1b[34m${controller ===undefined ? '' : `[${controller}]`}\x1b[34m${method ===undefined ? '' : `${controller ===undefined ? '' : '.'}[${method}]: `}${msgColor}\'${message}\'`);
    }
}