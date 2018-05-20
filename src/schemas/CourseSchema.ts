import { Schema, model, SchemaDefinition } from 'mongoose';
/**
*Base Course class that provides extensibility
*
*/
class Course extends Schema {
    userDefinitions: SchemaDefinition;
    constructor(definitions?: SchemaDefinition) {
        super({...{
        name: {
            type: String, 
            default: '',
            required: true, 
            trim: true
        }, 
        description: String,
        schedule: [{
            courseDate: {
                type: Date
            },
            courseRoom: {
                type: String
            }
        }],
        credits: {
            type: Number
        },
        lecturer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        }, ...definitions});   
    }
}

export default model('Course', new Course());