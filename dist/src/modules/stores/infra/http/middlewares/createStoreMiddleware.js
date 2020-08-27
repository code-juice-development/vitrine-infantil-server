"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var createStoreMiddleware = celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        link: celebrate_1.Joi.string().required(),
        api: celebrate_1.Joi.string().required(),
    }),
    _a));
exports.default = createStoreMiddleware;
