"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialPriceService = void 0;
const common_1 = require("@nestjs/common");
let SpecialPriceService = class SpecialPriceService {
    create(createSpecialPriceDto) {
        return 'This action adds a new specialPrice';
    }
    findAll() {
        return `This action returns all specialPrice`;
    }
    findOne(id) {
        return `This action returns a #${id} specialPrice`;
    }
    update(id, updateSpecialPriceDto) {
        return `This action updates a #${id} specialPrice`;
    }
    remove(id) {
        return `This action removes a #${id} specialPrice`;
    }
};
exports.SpecialPriceService = SpecialPriceService;
exports.SpecialPriceService = SpecialPriceService = __decorate([
    (0, common_1.Injectable)()
], SpecialPriceService);
//# sourceMappingURL=special-price.service.js.map