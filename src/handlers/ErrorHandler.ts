import { Response } from 'express';
import  * as HttpStatus  from 'http-status-codes';

export function handleError(res: Response, err: any, controller: String, method: String) {
    console.warn(`[${controller}].[${method}]: ${err.message || err}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!');
}