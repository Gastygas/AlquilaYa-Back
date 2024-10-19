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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async SignUp(newUser) {
        const userDb = await this.userRepository.findOne({ where: { email: newUser.email } });
        if (userDb)
            throw new common_1.BadRequestException('Email Already Used');
        if (newUser.password !== newUser.confirmPassword)
            throw new common_1.BadRequestException('Confirm Password is not the same');
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        if (!hashedPassword)
            throw new common_1.BadRequestException('Password could not be created');
        const { confirmPassword, ...restUser } = newUser;
        const newUserDb = await this.userRepository.create({ ...restUser, password: hashedPassword });
        await this.userRepository.save(newUserDb);
        return { succes: 'User registered!' };
    }
    async SignIn(userCredentials) {
        const userDb = await this.userRepository.findOne({ where: { email: userCredentials.email } });
        if (!userDb)
            throw new common_1.BadRequestException('Email or Password Incorrect');
        if (userDb.email !== userCredentials.email)
            throw new common_1.BadRequestException('Email or Password Incorrect');
        const isPasswordValid = await bcrypt.compare(userCredentials.password, userDb.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Email or Password Incorrect');
        const userPayload = {
            id: userDb.id,
            email: userDb.email,
            isAdmin: userDb.isAdmin
        };
        const token = await this.jwtService.sign(userPayload);
        return { succes: "User has been logged in succesfully", token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
;
//# sourceMappingURL=auth.service.js.map