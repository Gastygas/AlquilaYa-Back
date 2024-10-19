"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialPriceModule = void 0;
const common_1 = require("@nestjs/common");
const special_price_service_1 = require("./special-price.service");
const special_price_controller_1 = require("./special-price.controller");
let SpecialPriceModule = class SpecialPriceModule {
};
exports.SpecialPriceModule = SpecialPriceModule;
exports.SpecialPriceModule = SpecialPriceModule = __decorate([
    (0, common_1.Module)({
        controllers: [special_price_controller_1.SpecialPriceController],
        providers: [special_price_service_1.SpecialPriceService],
    })
], SpecialPriceModule);
//# sourceMappingURL=special-price.module.js.map