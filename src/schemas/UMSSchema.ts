import { Schema, SchemaDefinition } from 'mongoose';

export class UMSSchema extends Schema {
    constructor(definitions?: SchemaDefinition) {
        super({...{
        createdAt: {
            type: Date,
            default: new Date()
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date 
    }, ...definitions}, { strict: "throw" });   
    }
}