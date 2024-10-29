import { SetMetadata } from "@nestjs/common";
import { Role } from "src/modules/users/enum/user.roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles',roles)