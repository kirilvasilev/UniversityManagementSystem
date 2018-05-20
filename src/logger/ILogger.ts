export enum LogLevel {Information, Warning, Error};

export interface ILogger {
    log(message: String | any): void;
    log(message: String | any, controller: String, method: String): void;
    log(message: String | any, controller: String, method: String, level: LogLevel): void;
}