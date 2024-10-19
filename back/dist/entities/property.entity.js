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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const booking_entity_1 = require("./booking.entity");
const specialPrice_entity_1 = require("./specialPrice.entity");
let Property = class Property {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true }),
    __metadata("design:type", Array)
], Property.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        array: true,
    }),
    __metadata("design:type", Array)
], Property.prototype, "disableDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "propertyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "adress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "adressUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "bill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "wifi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "petFriendly", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "airConditioning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "heating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "pool", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "parking", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Property.prototype, "propertyStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.property),
    __metadata("design:type", Array)
], Property.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => specialPrice_entity_1.SpecialPrice, (specialPrice) => specialPrice.property),
    __metadata("design:type", Array)
], Property.prototype, "specialprice", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)('property')
], Property);
//# sourceMappingURL=property.entity.js.map