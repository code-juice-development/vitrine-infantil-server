"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@config/dotenv");
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var celebrate_1 = require("celebrate");
require("@shared/infra/typeorm");
require("@shared/container");
var routes_1 = __importDefault(require("@shared/infra/http/routes/"));
var errorHandler_1 = __importDefault(require("@shared/infra/http/middlewares/errorHandler"));
var bull_board_1 = __importDefault(require("bull-board"));
var Queue_1 = __importDefault(require("@shared/infra/bull/Queue"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(errorHandler_1.default);
bull_board_1.default.setQueues(Queue_1.default.getInstance().getQueues());
app.use('/admin', bull_board_1.default.UI);
app.listen(process.env.APP_PORT, function () {
    console.log('🚀 Served launched');
});
