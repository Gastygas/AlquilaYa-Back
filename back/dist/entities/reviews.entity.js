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
exports.Reviews = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const user_entity_1 = require("./user.entity");
let Reviews = class Reviews {
    constructor() {
        this.id = uuid_1.v4;
    }
};
exports.Reviews = Reviews;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Reviews.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, }),
    __metadata("design:type", Date)
], Reviews.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'none' }),
    __metadata("design:type", String)
], Reviews.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Reviews.prototype, "stars", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.reviews),
    __metadata("design:type", user_entity_1.User)
], Reviews.prototype, "user", void 0);
exports.Reviews = Reviews = __decorate([
    (0, typeorm_1.Entity)()
], Reviews);
//# sourceMappingURL=reviews.entity.js.map