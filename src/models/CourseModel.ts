import { Types } from 'mongoose';

import { IUMSModel } from './IUMSModel';

export interface ICourseModel extends IUMSModel {
    name: String;
    description: String;
    schedules: [{
        dayOfWeek: Number;
        time: String;
        room: String;
    }];
    credits: Number
    lecturer: Types.ObjectId;
};