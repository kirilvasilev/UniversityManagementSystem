import { Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { LogLevel, log } from '../logger/ILogger';
import { ContainerProvider } from '../container/ContainerProvider';



export function handleError(res: Response, err: String | Error, controller: String, method: String) {
    log(err, controller, method, LogLevel.Error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Oops! Something went wrong." });
}