import { Schema, model, SchemaDefinition } from 'mongoose';

import { UMSSchema } from './UMSSchema';
import { IUserModel } from '../models/UserModel';
/**
*Base User class that provides extensibility
*
*/
class UserSchemaClass extends UMSSchema {
    userDefinitions: SchemaDefinition;
    constructor(definitions?: SchemaDefinition) {
        super({...{
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
            type: String,
            enum: ['STUDENT', 'LECTURER'],
            default: 'STUDENT'
        },  
        credits: [{
            creditScore: {
                type: Number,
                required: function() { return this.userType == 'STUDENT'; },
                default: 0
            },
            course: {
                type: Schema.Types.ObjectId,
                required: function() { return this.userType == 'STUDENT'; },
                ref: 'Course'
            }

        }]
        // ,
        // courses: [{
        //     type: Schema.Types.ObjectId,
        //     required: function() { return this.userType == 'STUDENT';    },
        //     ref: 'Course'
        //     }]
        }, ...definitions});   
    }
}

export let UserSchema =  model<IUserModel>('user', new UserSchemaClass(), 'users');