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
var typeorm_1 = require("typeorm");
var Product_1 = __importDefault(require("@modules/products/infra/typeorm/entities/Product"));
var ProductsRepository = /** @class */ (function () {
    function ProductsRepository() {
        this.ormRepository = typeorm_1.getRepository(Product_1.default);
    }
    ProductsRepository.prototype.create = function (_a) {
        var name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product = this.ormRepository.create({
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
                        return [4 /*yield*/, this.ormRepository.save(product)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductsRepository.prototype.update = function (_a) {
        var id = _a.id, name = _a.name, description = _a.description, image = _a.image, category = _a.category, link = _a.link, price = _a.price, size = _a.size, color = _a.color, gender = _a.gender, store_id = _a.store_id;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product = this.ormRepository.create({
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
                            store_id: store_id
                        });
                        return [4 /*yield*/, this.ormRepository.save(product)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductsRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.delete(id)];
                    case 1:
                        deleteResult = _a.sent();
                        return [2 /*return*/, deleteResult.affected != null];
                }
            });
        });
    };
    ProductsRepository.prototype.deleteByStore = function (store_id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.delete({ store_id: store_id })];
                    case 1:
                        deleteResult = _a.sent();
                        return [2 /*return*/, deleteResult.affected != null];
                }
            });
        });
    };
    ProductsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        store = _a.sent();
                        return [2 /*return*/, store];
                }
            });
        });
    };
    ProductsRepository.prototype.findByFilters = function (page, name, description, category, gender, minimum_price, maximum_price) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = this.ormRepository.createQueryBuilder('product');
                        if (name) {
                            queryBuilder.andWhere("translate(lower(product.name), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc') like \n        '%'||translate(lower('" + name + "'), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc')||'%'");
                        }
                        if (description) {
                            queryBuilder.andWhere("translate(lower(product.description), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc') like \n        '%'||translate(lower('" + description + "'), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc')||'%'");
                        }
                        if (category) {
                            queryBuilder.andWhere('product.category = :category', { category: category });
                        }
                        if (gender) {
                            queryBuilder.andWhere('product.gender = :gender', { gender: gender });
                        }
                        if (minimum_price) {
                            queryBuilder.andWhere('product.price >= :minimum_price', { minimum_price: minimum_price });
                        }
                        if (maximum_price) {
                            queryBuilder.andWhere('product.price <= :maximum_price', { maximum_price: maximum_price });
                        }
                        return [4 /*yield*/, queryBuilder
                                .orderBy('product.price')
                                .limit(10)
                                .offset((page - 1) * 10)
                                .getMany()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, products];
                }
            });
        });
    };
    ProductsRepository.prototype.countByFilters = function (name, description, category, gender, minimum_price, maximum_price) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBuilder = this.ormRepository.createQueryBuilder('product');
                        if (name) {
                            queryBuilder.andWhere("translate(lower(product.name), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc') like \n        '%'||translate(lower('" + name + "'), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc')||'%'");
                        }
                        if (description) {
                            queryBuilder.andWhere("translate(lower(product.description), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc') like \n        '%'||translate(lower('" + description + "'), '\u00E0\u00E1\u00E2\u00E3\u00E4\u00E9\u00E8\u00EB\u00EA\u00ED\u00EC\u00EF\u00EE\u00F3\u00F2\u00F5\u00F6\u00F4\u00FA\u00F9\u00FC\u00FB\u00E7', 'aaaaaeeeeiiiiooooouuuuc')||'%'");
                        }
                        if (category) {
                            queryBuilder.andWhere('product.category = :category', { category: category });
                        }
                        if (gender) {
                            queryBuilder.andWhere('product.gender = :gender', { gender: gender });
                        }
                        if (minimum_price) {
                            queryBuilder.andWhere('product.price >= :minimum_price', { minimum_price: minimum_price });
                        }
                        if (maximum_price) {
                            queryBuilder.andWhere('product.price <= :maximum_price', { maximum_price: maximum_price });
                        }
                        return [4 /*yield*/, queryBuilder.getCount()];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    ProductsRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stores;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.find()];
                    case 1:
                        stores = (_a.sent()) || new Array();
                        return [2 /*return*/, stores];
                }
            });
        });
    };
    return ProductsRepository;
}());
exports.default = ProductsRepository;
