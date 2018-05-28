import { Schema, model, SchemaDefinition } from 'mongoose';

import { UMSSchema } from './UMSSchema';
import { IUserModel } from '../models/UserModel';
/**
*Base User class that provides extensibility
*
*/
class UserSchemaClass extends UMSSchema {
    constructor(definitions?: SchemaDefinition) {
        super({
            ...{
                name: {
                    first: {
                        type: String,
                        default: '',
                        required: true,
                        trim: true
                    },
                    last: {
                        type: String,
                        default: '',
                        required: true,
                        trim: true
                    }
                },
                username: {
                    type: String,
                    default: '',
                    required: true,
                    unique: true,
                    lowercase: true
                },
                password: {
                    type: String,
                    default: '',
                    required: true,
                    min: 6
                },
                userType: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 1
                },
                courses: [{
                    creditScore: {
                        type: Number,
                        default: 0
                    },
                    course: {
                        type: Schema.Types.ObjectId,
                        ref: 'course'
                    }

                }]
            }, ...definitions
        });
    }
}

export let UserSchema = model<IUserModel>('user', new UserSchemaClass(), 'users');