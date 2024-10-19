"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSpecialPriceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_special_price_dto_1 = require("./create-special-price.dto");
class UpdateSpecialPriceDto extends (0, swagger_1.PartialType)(create_special_price_dto_1.CreateSpecialPriceDto) {
}
exports.UpdateSpecialPriceDto = UpdateSpecialPriceDto;
//# sourceMappingURL=update-special-price.dto.js.map