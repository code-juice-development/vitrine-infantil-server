"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var updateProductMiddleware = celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        image: celebrate_1.Joi.string().required(),
        category: celebrate_1.Joi.string().required(),
        link: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().required(),
        size: celebrate_1.Joi.string().required(),
        color: celebrate_1.Joi.string().required(),
        gender: celebrate_1.Joi.string().required(),
        store_id: celebrate_1.Joi.string().uuid().required(),
    }),
    _a));
exports.default = updateProductMiddleware;
