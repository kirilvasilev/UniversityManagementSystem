import { Request, Response, NextFunction } from "express-serve-static-core";
import * as HttpStatus from 'http-status-codes'; 

export class RouterValidator {

    protected async ValidateId(req: Request, res: Response, next: NextFunction) {
        if (req.params.id === "undefined" || req.params.id === undefined || (req.params.id as string).length < 12) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: `Invalid parameter ID: ${req.params.id}` });
            return;
        }
        next();
    }

    protected async ValidateBody(req: Request, res: Response, next: NextFunction) {
        if (req.body === "undefined" || req.body === undefined) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: `Invalid request body: ${req.body}` });
            return;
        }
        next();
    }
}