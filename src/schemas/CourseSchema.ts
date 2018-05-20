import { Schema, model, SchemaDefinition } from 'mongoose';
import { ICourseModel } from '../models/CourseModel';
/**
*Base Course class that provides extensibility
*
*/
class CourseSchemaClass extends Schema {
    constructor(definitions?: SchemaDefinition) {
        super({...{
        name: {
            type: String, 
            default: '',
            required: true, 
            trim: true
        }, 
        description: String,
        schedules: [{
            courseDate: {
                type: Date,
                required: true
            },
            courseRoom: {
                type: String,
                required: true
            }
        }],
        credits: {
            type: Number,
            required: true
        },
        lecturer: {
            type: Schema.Types.ObjectId,
            ref: 'user'
            }
        }, ...definitions});   
    }
}

export let CourseSchema =  model<ICourseModel>('course', new CourseSchemaClass(), 'courses');