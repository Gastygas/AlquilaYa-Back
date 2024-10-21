import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/roles.decorator';
import { Roles } from './enum/user.roles.enum';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiBearerAuth()
  @Get()
  // @Role(Roles.Admin)
  // @UseGuards(AuthGuard,RolesGuard)
  geAllUsersController() {
    return this.usersService.getAllUsersService();
  }

  @Get(':id')
  getUserById(@Param("id",ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id)
  }

  // @Put('/')
  // changeUser(@Req() id: string, @Body() newUser) {}

  // @Delete('/')
  // deleteUser(@Query() id: string) {}
}
