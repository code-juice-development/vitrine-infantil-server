"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var indexProductsMiddleware = celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.QUERY] = celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().optional(),
        description: celebrate_1.Joi.string().optional(),
        category: celebrate_1.Joi.string().optional(),
        gender: celebrate_1.Joi.string().optional(),
        minimum_price: celebrate_1.Joi.number().optional(),
        maximum_price: celebrate_1.Joi.number().optional(),
        /** Pagination */
        page: celebrate_1.Joi.number().optional(),
    }),
    _a));
exports.default = indexProductsMiddleware;
