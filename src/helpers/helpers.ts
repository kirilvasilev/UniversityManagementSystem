import { Request } from 'express';
import { User } from "../DTO/User";

export interface IRequest extends Request {
    user?: User
  }