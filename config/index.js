"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
dotenv_1.default.config();
class Config {
    constructor() {
        this.rabbitmqUrl = process.env.RABBITMQ_URL || config_1.default.get('rabbitmqUrl');
        this.port = Number(process.env.PORT) || config_1.default.get('port');
    }
}
const configuration = new Config();
exports.default = configuration;
