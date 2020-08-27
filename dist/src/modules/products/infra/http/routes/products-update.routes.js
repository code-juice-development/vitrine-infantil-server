"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductsUpdateController_1 = __importDefault(require("@modules/products/infra/http/controllers/ProductsUpdateController"));
var isUserLoggedIn_1 = __importDefault(require("@modules/users/infra/http/middlewares/isUserLoggedIn"));
var productsUpdateRouter = express_1.Router();
var productsUpdateController = new ProductsUpdateController_1.default();
productsUpdateRouter.use(isUserLoggedIn_1.default);
productsUpdateRouter.get('/', productsUpdateController.create);
exports.default = productsUpdateRouter;
