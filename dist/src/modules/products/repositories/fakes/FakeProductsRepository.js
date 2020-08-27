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
var uuid_1 = require("uuid");
var Product_1 = __importDefault(require("@modules/products/infra/typeorm/entities/Product"));
var FakeProductsRepository = /** @class */ (function () {
    function FakeProductsRepository() {
        this.products = [];
    }
    FakeProductsRepository.prototype.create = function (_a) {
        var name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
        return __awaiter(this, void 0, void 0, function () {
            var store;
            return __generator(this, function (_b) {
                store = new Product_1.default();
                Object.assign(store, { id: uuid_1.v4() }, {
                    name: name,
                    description: description,
                    image: image,
                    category: category,
                    link: link,
                    price: price,
                    size: size,
                    color: color,
                    gender: gender,
                    store_id: store_id
                });
                this.products.push(store);
                return [2 /*return*/, store];
            });
        });
    };
    FakeProductsRepository.prototype.update = function (_a) {
        var id = _a.id, name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                product = this.products.find(function (product) { return product.id === id; });
                Object.assign(product, {
                    name: name,
                    description: description,
                    image: image,
                    category: category,
                    link: link,
                    price: price,
                    size: size,
                    color: color,
                    gender: gender,
                    store_id: store_id
                });
                return [2 /*return*/, product !== null && product !== void 0 ? product : new Product_1.default()];
            });
        });
    };
    FakeProductsRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.products.findIndex(function (product) { return product.id === id; });
                this.products.splice(findIndex, 1);
                return [2 /*return*/, true];
            });
        });
    };
    FakeProductsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                product = this.products.find(function (product) { return product.id === id; });
                return [2 /*return*/, product];
            });
        });
    };
    FakeProductsRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.products];
            });
        });
    };
    FakeProductsRepository.prototype.deleteByStore = function (store_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.products = this.products.filter(function (product) { return product.store_id !== store_id; });
                return [2 /*return*/, true];
            });
        });
    };
    FakeProductsRepository.prototype.findByFilters = function (page, name, description, category, gender, minimum_price, maximum_price) {
        return __awaiter(this, void 0, void 0, function () {
            var searchProducts;
            return __generator(this, function (_a) {
                searchProducts = this.products.filter(function (product) {
                    var isValid = true;
                    if (name && product.name !== name) {
                        isValid = false;
                    }
                    if (description && product.description !== description) {
                        isValid = false;
                    }
                    if (category && product.category !== category) {
                        isValid = false;
                    }
                    if (gender && product.gender !== gender) {
                        isValid = false;
                    }
                    if (minimum_price && Number(product.price) <= minimum_price) {
                        isValid = false;
                    }
                    if (maximum_price && Number(product.price) >= maximum_price) {
                        isValid = false;
                    }
                    return isValid;
                });
                return [2 /*return*/, searchProducts.slice((page - 1) * 10, 10)];
            });
        });
    };
    FakeProductsRepository.prototype.countByFilters = function (name, description, category, gender, minimum_price, maximum_price) {
        return __awaiter(this, void 0, void 0, function () {
            var searchProducts;
            return __generator(this, function (_a) {
                searchProducts = this.products.filter(function (product) {
                    var isValid = true;
                    if (name && product.name !== name) {
                        isValid = false;
                    }
                    if (description && product.description !== description) {
                        isValid = false;
                    }
                    if (category && product.category !== category) {
                        isValid = false;
                    }
                    if (gender && product.gender !== gender) {
                        isValid = false;
                    }
                    if (minimum_price && Number(product.price) <= minimum_price) {
                        isValid = false;
                    }
                    if (maximum_price && Number(product.price) >= maximum_price) {
                        isValid = false;
                    }
                    return isValid;
                });
                return [2 /*return*/, searchProducts.length];
            });
        });
    };
    return FakeProductsRepository;
}());
;
exports.default = FakeProductsRepository;
