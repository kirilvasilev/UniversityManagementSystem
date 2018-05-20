import { Response } from 'express';
import  * as HttpStatus  from 'http-status-codes';

import { ILogger, LogLevel } from '../logger/ILogger';
import { ContainerProvider } from '../container/ContainerProvider';



export function handleError(res: Response, err: String | Error, controller: String, method: String) {
    const logger = ContainerProvider.provide<ILogger>('logger');
    logger.log(err, controller, method, LogLevel.Error);  
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
}