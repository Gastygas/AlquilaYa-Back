import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enum/user.roles.enum';
import { completeUserDto } from './dto/completeUser.dto';
import { ICustomRequest } from '../property/interface/customRequest';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  @ApiBearerAuth()
  @Put('edit')
  @UseGuards(AuthGuard)
  updateUserController(
    @Body() updatedUser:UpdateUserDto,
    @Req() req:ICustomRequest
  ){
    const userId = req.user.id
    return this.usersService.updateUserService(updatedUser,userId)
  }

  @Put(':id')
  completeUser(@Param("id",ParseUUIDPipe) id: string, @Body() user: completeUserDto) {
    return  this.usersService.completeUser(id,user)
  }
  
  @ApiBearerAuth()
  @Patch('favourite/property/add/:id')
  @UseGuards(AuthGuard)
  addFavoritePropertyController(
    @Param("id", ParseUUIDPipe) propertyId: string,
    @Req() req: ICustomRequest
  ){
    const userId = req.user.id
    return this.usersService.addFavoritePropertyService(propertyId,userId)
  }


  // @Delete('/')
  // deleteUser(@Query() id: string) {}
}
