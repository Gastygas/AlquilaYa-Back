import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[AuthService,JwtService],
    controllers:[AuthController]
})
export class AuthModule{

};