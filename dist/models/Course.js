"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
*Base Course class that provides extensibility
*
*/
class Course extends mongoose_1.Schema {
    constructor(definitions) {
        super(Object.assign({
            name: {
                type: String,
                default: '',
                required: true,
                trim: true
            },
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
            lecturer: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User'
                }],
            createdAt: Date
        }, definitions));
    }
}
exports.default = mongoose_1.model('Course', new Course());
//# sourceMappingURL=Course.js.map