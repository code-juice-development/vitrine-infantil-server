"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var stores_routes_1 = __importDefault(require("@modules/stores/infra/http/routes/stores.routes"));
var products_routes_1 = __importDefault(require("@modules/products/infra/http/routes/products.routes"));
var products_update_routes_1 = __importDefault(require("@modules/products/infra/http/routes/products-update.routes"));
var users_routes_1 = __importDefault(require("@modules/users/infra/http/routes/users.routes"));
var session_routes_1 = __importDefault(require("@modules/users/infra/http/routes/session.routes"));
var routes = express_1.Router();
routes.use('/stores', stores_routes_1.default);
routes.use('/products', products_routes_1.default);
routes.use('/products-update', products_update_routes_1.default);
routes.use('/users', users_routes_1.default);
routes.use('/sessions', session_routes_1.default);
exports.default = routes;
