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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const booking_entity_1 = require("./booking.entity");
let Payment = class Payment {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'date' }),
    __metadata("design:type", Date)
], Payment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "float" }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Payment.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_entity_1.Booking, (booking) => booking.payment, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'booking' }),
    __metadata("design:type", booking_entity_1.Booking)
], Payment.prototype, "booking", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
//# sourceMappingURL=payment.entity.js.map