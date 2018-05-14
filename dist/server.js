"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
class Server {
    /**
     *
     */
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // set up mongoose
        const MONGO_URI = 'mongodb://localhost/ums';
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URI);
        // configure middleware
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(morgan_1.default('dev'));
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        let router;
        router = express_1.default.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/users', UserRouter_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map