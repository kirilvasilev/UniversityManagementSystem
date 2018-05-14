"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
*Base User class that provides extensibility
*
*/
class User extends mongoose_1.Schema {
    constructor(definitions) {
        super(Object.assign({
            name: {
                first: { type: String, default: '', required: true, trim: true },
                last: { type: String, default: '', required: true, trim: true }
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
            createdAt: Date,
            credits: {
                type: Number,
                required: function () { return this.userType == 'STUDENT'; },
                default: 0
            },
            courses: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: function () { return this.userType == 'STUDENT'; },
                    ref: 'Course'
                }],
        }, definitions));
    }
}
exports.default = mongoose_1.model('User', new User());
//# sourceMappingURL=User.js.map