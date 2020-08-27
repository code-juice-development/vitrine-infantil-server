"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("@config/dotenv");
require("@shared/infra/typeorm");
require("@shared/container");
var Queue_1 = __importDefault(require("@shared/infra/bull/Queue"));
Queue_1.default.getInstance().add('UpdateProducts', null, { repeat: { cron: '00 01 * * *' } });
console.log('🚀 Queue launched');
