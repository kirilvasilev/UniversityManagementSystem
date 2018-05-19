import { Schema, model, SchemaDefinition } from 'mongoose';
import { UMSSchema } from './BaseSchema';
/**
*Base User class that provides extensibility
*
*/
class User extends UMSSchema {
    userDefinitions: SchemaDefinition;
    constructor(definitions?: SchemaDefinition) {
        super({...{
            name: {
                first: { type: String, default: '', required: true, trim: true},
                last: { type: String, default: '', required: true, trim: true}
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
            required: true
        },
        userType: {
            type: String,
            enum: ['STUDENT', 'LECTURER'],
            default: 'STUDENT'
        },  
        credits: {
            type: Number,
            required: function() { return this.userType == 'STUDENT'; },
            default: 0
        },
        courses: [{
            type: Schema.Types.ObjectId,
            required: function() { return this.userType == 'STUDENT';    },
            ref: 'Course'
            }]
        }, ...definitions});   
    }
}

export default model('User', new User());