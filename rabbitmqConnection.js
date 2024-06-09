"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConnection = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
class RabbitMQConnection {
    constructor() { }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!RabbitMQConnection.instance) {
                RabbitMQConnection.instance = new RabbitMQConnection();
                yield RabbitMQConnection.instance.connect();
            }
            return RabbitMQConnection.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect(config_1.default.rabbitmqUrl);
                this.channel = yield this.connection.createChannel();
            }
            catch (error) {
                logger_1.default.error('Failed to connect to RabbitMQ', error);
                throw error;
            }
        });
    }
    getChannel() {
        if (!this.channel) {
            throw new Error('Channel is not created. Call connect() first.');
        }
        return this.channel;
    }
}
exports.RabbitMQConnection = RabbitMQConnection;
