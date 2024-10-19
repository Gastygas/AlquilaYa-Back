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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialPriceController = void 0;
const common_1 = require("@nestjs/common");
const special_price_service_1 = require("./special-price.service");
const create_special_price_dto_1 = require("./dto/create-special-price.dto");
const update_special_price_dto_1 = require("./dto/update-special-price.dto");
const swagger_1 = require("@nestjs/swagger");
let SpecialPriceController = class SpecialPriceController {
    constructor(specialPriceService) {
        this.specialPriceService = specialPriceService;
    }
    create(createSpecialPriceDto) {
        return this.specialPriceService.create(createSpecialPriceDto);
    }
    findAll() {
        return this.specialPriceService.findAll();
    }
    findOne(id) {
        return this.specialPriceService.findOne(+id);
    }
    update(id, updateSpecialPriceDto) {
        return this.specialPriceService.update(+id, updateSpecialPriceDto);
    }
    remove(id) {
        return this.specialPriceService.remove(+id);
    }
};
exports.SpecialPriceController = SpecialPriceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_special_price_dto_1.CreateSpecialPriceDto]),
    __metadata("design:returntype", void 0)
], SpecialPriceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpecialPriceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecialPriceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_special_price_dto_1.UpdateSpecialPriceDto]),
    __metadata("design:returntype", void 0)
], SpecialPriceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecialPriceController.prototype, "remove", null);
exports.SpecialPriceController = SpecialPriceController = __decorate([
    (0, swagger_1.ApiTags)('special-price'),
    (0, common_1.Controller)('special-price'),
    __metadata("design:paramtypes", [special_price_service_1.SpecialPriceService])
], SpecialPriceController);
//# sourceMappingURL=special-price.controller.js.map