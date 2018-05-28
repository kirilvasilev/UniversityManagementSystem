import { Document } from 'mongoose';

export interface IUMSModel extends Document {
    createdAt: Date;
    deleted: Boolean;
    deletedAt: Date;
};