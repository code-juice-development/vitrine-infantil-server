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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var CreateProductService_1 = __importDefault(require("@modules/products/services/CreateProductService"));
var UpdateProductService_1 = __importDefault(require("@modules/products/services/UpdateProductService"));
var DeleteProductService_1 = __importDefault(require("@modules/products/services/DeleteProductService"));
//import ListProductService from '@modules/products/services/ListProductsService';
var ListProductsFilteredService_1 = __importDefault(require("@modules/products/services/ListProductsFilteredService"));
var ShowProductService_1 = __importDefault(require("@modules/products/services/ShowProductService"));
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, image, category, link, price, size, color, gender, store_id, createProductService, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
                        createProductService = tsyringe_1.container.resolve(CreateProductService_1.default);
                        return [4 /*yield*/, createProductService.execute({
                                name: name,
                                description: description,
                                image: image,
                                category: category,
                                link: link,
                                price: price,
                                size: size,
                                color: color,
                                gender: gender,
                                store_id: store_id,
                            })];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, response.status(201).json(product)];
                }
            });
        });
    };
    ProductsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, description, image, category, link, price, size, color, gender, store_id, updateProductService;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        _a = request.body, name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
                        updateProductService = tsyringe_1.container.resolve(UpdateProductService_1.default);
                        return [4 /*yield*/, updateProductService.execute({
                                id: id,
                                name: name,
                                description: description,
                                image: image,
                                category: category,
                                link: link,
                                price: price,
                                size: size,
                                color: color,
                                gender: gender,
                                store_id: store_id,
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.status(204).send()];
                }
            });
        });
    };
    ProductsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteProductService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteProductService = tsyringe_1.container.resolve(DeleteProductService_1.default);
                        return [4 /*yield*/, deleteProductService.execute({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(204).send()];
                }
            });
        });
    };
    ProductsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, name, description, category, gender, minimum_price, maximum_price, listProductsService, _b, products, total;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = request.query, page = _a.page, name = _a.name, description = _a.description, category = _a.category, gender = _a.gender, minimum_price = _a.minimum_price, maximum_price = _a.maximum_price;
                        listProductsService = tsyringe_1.container.resolve(ListProductsFilteredService_1.default);
                        return [4 /*yield*/, listProductsService.execute({
                                page: Number(page !== null && page !== void 0 ? page : 1),
                                name: String(name !== null && name !== void 0 ? name : ''),
                                description: String(description !== null && description !== void 0 ? description : ''),
                                category: String(category !== null && category !== void 0 ? category : ''),
                                gender: String(gender !== null && gender !== void 0 ? gender : ''),
                                minimum_price: Number(minimum_price !== null && minimum_price !== void 0 ? minimum_price : 0),
                                maximum_price: Number(maximum_price !== null && maximum_price !== void 0 ? maximum_price : 0)
                            })];
                    case 1:
                        _b = _c.sent(), products = _b.products, total = _b.total;
                        response.header('X-Total-Count', String(total));
                        return [2 /*return*/, response.json(products)];
                }
            });
        });
    };
    ProductsController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showProductService, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showProductService = tsyringe_1.container.resolve(ShowProductService_1.default);
                        return [4 /*yield*/, showProductService.execute({ id: id })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    return ProductsController;
}());
;
exports.default = ProductsController;
