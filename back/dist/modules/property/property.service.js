"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
let PropertyService = class PropertyService {
    create(createPropertyDto) {
        return 'This action adds a new property';
    }
    findAll() {
        return `This action returns all property`;
    }
    findOne(id) {
        return `This action returns a #${id} property`;
    }
    update(id, updatePropertyDto) {
        return `This action updates a #${id} property`;
    }
    remove(id) {
        return `This action removes a #${id} property`;
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)()
], PropertyService);
//# sourceMappingURL=property.service.js.map