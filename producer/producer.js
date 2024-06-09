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
exports.Producer = void 0;
const rabbitmqConnection_1 = require("../rabbitmqConnection");
const logger_1 = __importDefault(require("../utils/logger"));
class Producer {
    constructor() {
        rabbitmqConnection_1.RabbitMQConnection.getInstance()
            .then(connection => {
            this.channel = connection.getChannel();
        })
            .catch(error => {
            logger_1.default.error('Failed to create producer', error);
        });
    }
    sendToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
                logger_1.default.info(`Sent: ${message}`);
            }
            catch (error) {
                logger_1.default.error('Failed to send message', error);
            }
        });
    }
}
exports.Producer = Producer;
