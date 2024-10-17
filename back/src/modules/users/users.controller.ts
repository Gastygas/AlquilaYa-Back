import { Body, Controller, Delete, Get, Param, Put, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get("/")
    getUsers(){
        return this.usersService.getUsers
    }

    @Get(":id")
    getUserById(@Param() id:string){

    }

    @Put("/")
    changeUser(@Req() id:string, @Body() newUser ){

    }

    @Delete("/")
    deleteUser(@Query() id:string){

    }
}

