"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var deleteUserMiddleware = celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().uuid().required(),
    }),
    _a));
exports.default = deleteUserMiddleware;
