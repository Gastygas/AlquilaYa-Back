"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const signUp_dto_1 = require("./signUp.dto");
class SignInDto extends (0, swagger_1.PickType)(signUp_dto_1.SignUpDto, [
    'email', 'password'
]) {
}
exports.SignInDto = SignInDto;
//# sourceMappingURL=signIn.dto.js.map