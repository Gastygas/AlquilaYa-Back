import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/modules/users/enum/user.roles.enum";

export const Role = (...roles: Roles[]) => SetMetadata('roles',roles)