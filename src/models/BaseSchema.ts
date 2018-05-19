import { Schema, SchemaDefinition } from 'mongoose';

export class UMSSchema extends Schema {
    constructor(definitions?: SchemaDefinition) {
        super({...{
        createdAt: {
            type: Date,
            default: Date.now()
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, ...definitions});   
    }
}