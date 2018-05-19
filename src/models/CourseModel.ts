import { Types } from 'mongoose';

import { IUMSModel } from './IUMSModel';

export interface ICourseModel extends IUMSModel {
    name: String;
    description: String;
    schedule: [{
        courseDate: Date;
        courseRoom: String;
    }];
    credits: Number
    lecturer: Types.ObjectId;
};