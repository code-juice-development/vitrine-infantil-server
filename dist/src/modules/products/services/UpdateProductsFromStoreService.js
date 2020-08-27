"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var rss_parser_1 = __importDefault(require("rss-parser"));
;
var UpdateProductsFromStoreService = /** @class */ (function () {
    function UpdateProductsFromStoreService(productsRepository) {
        this.productsRepository = productsRepository;
    }
    UpdateProductsFromStoreService.prototype.execute = function (_a) {
        var store_id = _a.store_id, api = _a.api;
        return __awaiter(this, void 0, void 0, function () {
            var parser, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parser = new rss_parser_1.default({ customFields: { item: this.getRssCustomFields() } });
                        return [4 /*yield*/, this.productsRepository.deleteByStore(store_id)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, parser.parseURL(api)];
                    case 2:
                        data = _b.sent();
                        if (!data || !data.items)
                            return [2 /*return*/];
                        data.items.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var name, description, link, image, category, price, size, color, gender;
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (!element)
                                            return [2 /*return*/];
                                        name = String(element['g:title']).substr(0, 254);
                                        description = String(element['g:description']).substr(0, 254);
                                        link = element['g:link'];
                                        image = element['g:image_link'];
                                        category = String((_b = new RegExp('[^>]*$').exec((_a = element['g:product_type']) !== null && _a !== void 0 ? _a : '')[0]) !== null && _b !== void 0 ? _b : '').trim();
                                        price = String((_d = new RegExp('^[^a-zA-Z]*').exec((_c = element['g:price']) !== null && _c !== void 0 ? _c : '')[0]) !== null && _d !== void 0 ? _d : 0).trim();
                                        size = element['g:size'];
                                        color = element['g:color'];
                                        gender = element['g:gender'];
                                        return [4 /*yield*/, this.productsRepository.create({
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
                                        _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    UpdateProductsFromStoreService.prototype.getRssCustomFields = function () {
        return [
            'g:title',
            'g:description',
            'g:link',
            'g:image_link',
            'g:product_type',
            'g:price',
            'g:size',
            'g:color',
            'g:gender',
        ];
    };
    UpdateProductsFromStoreService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject('ProductsRepository')),
        __metadata("design:paramtypes", [Object])
    ], UpdateProductsFromStoreService);
    return UpdateProductsFromStoreService;
}());
;
exports.default = UpdateProductsFromStoreService;
