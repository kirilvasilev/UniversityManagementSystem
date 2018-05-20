import { ContainerProvider } from "../container/ContainerProvider";

export enum LogLevel {Information, Warning, Error};

export interface ILogger {
    log(message: String | any): void;
    log(message: String | any, controller: String, method: String): void;
    log(message: String | any, controller: String, method: String, level: LogLevel): void;
}

export function log(message: any, controller?: any, method?: any, level?: any) {
    const logger = ContainerProvider.provide<ILogger>('logger');
    logger.log(message, controller, method, level);  
};