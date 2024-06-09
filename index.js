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
const express_1 = __importDefault(require("express"));
const producer_1 = require("./producer/producer");
const consumer_1 = require("./consumer/consumer");
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const producer = new producer_1.Producer();
const consumer = new consumer_1.Consumer();
app.use(express_1.default.json());
app.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queue, message } = req.body;
    yield producer.sendToQueue(queue, message);
    res.send('Message sent');
}));
app.listen(config_1.default.port, () => {
    logger_1.default.info(`Server started on port ${config_1.default.port}`);
});
consumer.consume('my-queue', (message) => {
    logger_1.default.info(`Received: ${message}`);
});
