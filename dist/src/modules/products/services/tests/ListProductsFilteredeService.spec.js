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
var FakeProductsRepository_1 = __importDefault(require("@modules/products/repositories/fakes/FakeProductsRepository"));
var ListProductsFilteredService_1 = __importDefault(require("@modules/products/services/ListProductsFilteredService"));
var fakeProductsRepository;
var listProductsFilteredService;
describe('List Products Filtered Service', function () {
    beforeEach(function () {
        fakeProductsRepository = new FakeProductsRepository_1.default();
        listProductsFilteredService = new ListProductsFilteredService_1.default(fakeProductsRepository);
    });
    it('should be able to list all Products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productYellowShoe, productRedShoe, productGreenShoe, productBlueShoe, productGrayShoe, nameTestResponse, categoryTestResponse, descriptionTestResponse, genderTestResponse, minimumPriceTestResponse, maximumPriceTestResponse, bewteenPriceTestResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeProductsRepository.create({
                        name: 'Yellow Shoe',
                        description: 'A comfortable shoe',
                        image: 'www.store.com/api/yellowshoe/image',
                        category: 'Shoes',
                        link: 'www.store.com/api/yellowshoe',
                        price: '75.15',
                        size: '42',
                        color: 'Yellow',
                        gender: 'Unissex',
                        store_id: '123',
                    })];
                case 1:
                    productYellowShoe = _a.sent();
                    return [4 /*yield*/, fakeProductsRepository.create({
                            name: 'Red Shoe',
                            description: 'A comfortable shoe',
                            image: 'www.store.com/api/redshoe/image',
                            category: 'Shoes',
                            link: 'www.store.com/api/redshoe',
                            price: '100.15',
                            size: '40',
                            color: 'Red',
                            gender: 'Unissex',
                            store_id: '123',
                        })];
                case 2:
                    productRedShoe = _a.sent();
                    return [4 /*yield*/, fakeProductsRepository.create({
                            name: 'Red Shoe',
                            description: 'A beautiful shoe',
                            image: 'www.store.com/api/greenshoe/image',
                            category: 'Shoes',
                            link: 'www.store.com/api/greenshoe',
                            price: '80.15',
                            size: '40',
                            color: 'Green',
                            gender: 'Unissex',
                            store_id: '123',
                        })];
                case 3:
                    productGreenShoe = _a.sent();
                    return [4 /*yield*/, fakeProductsRepository.create({
                            name: 'Blue Shoe',
                            description: 'A comfortable shoe',
                            image: 'www.store.com/api/blueshoe/image',
                            category: 'Shoes',
                            link: 'www.store.com/api/blueshoe',
                            price: '20.15',
                            size: '40',
                            color: 'Blue',
                            gender: 'Feminine',
                            store_id: '123',
                        })];
                case 4:
                    productBlueShoe = _a.sent();
                    return [4 /*yield*/, fakeProductsRepository.create({
                            name: 'Gray Shoe',
                            description: 'A hard shoe',
                            image: 'www.store.com/api/grayshoe/image',
                            category: 'Hard Shoes',
                            link: 'www.store.com/api/grayshoe',
                            price: '40.15',
                            size: '40',
                            color: 'Gray',
                            gender: 'Male',
                            store_id: '123',
                        })];
                case 5:
                    productGrayShoe = _a.sent();
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: 'Yellow Shoe',
                            category: '',
                            description: '',
                            gender: '',
                            minimum_price: 0,
                            maximum_price: 0,
                        })];
                case 6:
                    nameTestResponse = _a.sent();
                    expect(nameTestResponse.products).toContain(productYellowShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: 'Hard Shoes',
                            description: '',
                            gender: '',
                            minimum_price: 0,
                            maximum_price: 0,
                        })];
                case 7:
                    categoryTestResponse = _a.sent();
                    expect(categoryTestResponse.products).toContain(productGrayShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: '',
                            description: 'A beautiful shoe',
                            gender: '',
                            minimum_price: 0,
                            maximum_price: 0,
                        })];
                case 8:
                    descriptionTestResponse = _a.sent();
                    expect(descriptionTestResponse.products).toContain(productGreenShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: '',
                            description: '',
                            gender: 'Feminine',
                            minimum_price: 0,
                            maximum_price: 0,
                        })];
                case 9:
                    genderTestResponse = _a.sent();
                    expect(genderTestResponse.products).toContain(productBlueShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: '',
                            description: '',
                            gender: '',
                            minimum_price: 100,
                            maximum_price: 0,
                        })];
                case 10:
                    minimumPriceTestResponse = _a.sent();
                    expect(minimumPriceTestResponse.products).toContain(productRedShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: '',
                            description: '',
                            gender: '',
                            minimum_price: 0,
                            maximum_price: 25,
                        })];
                case 11:
                    maximumPriceTestResponse = _a.sent();
                    expect(maximumPriceTestResponse.products).toContain(productBlueShoe);
                    return [4 /*yield*/, listProductsFilteredService.execute({
                            page: 1,
                            name: '',
                            category: '',
                            description: '',
                            gender: '',
                            minimum_price: 15,
                            maximum_price: 45,
                        })];
                case 12:
                    bewteenPriceTestResponse = _a.sent();
                    expect(bewteenPriceTestResponse.products).toContain(productBlueShoe);
                    expect(bewteenPriceTestResponse.products).toContain(productGrayShoe);
                    return [2 /*return*/];
            }
        });
    }); });
});
