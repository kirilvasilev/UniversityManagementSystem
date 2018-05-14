"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetUser(req, res) {
        User_1.default.find({})
            .then(data => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    DeleteUser(req, res) {
    }
    UpdateUser(req, res) {
    }
    routes() {
        this.router.get('/users', this.GetUser);
    }
}
// export
exports.default = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map