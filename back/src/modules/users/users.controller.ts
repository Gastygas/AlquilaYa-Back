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
import { Roles } from 'src/decorators/roles.decorator';
import { completeUserDto } from './dto/completeUser.dto';
import { ICustomRequest } from '../property/interface/customRequest';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Request } from 'express';
import { Role } from './enum/user.roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

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
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmailService(email);
  }
  //-----------------------------------------------------------------------------------------
  //----------- Auth0 (GET /auth0/protected)
  //-----------------------------------------------------------------------------------------
  @Get('auth0/protected')
  getAuth0Protected(@Req() req: Request) {
    console.log('TOKEN: ', req.oidc.accessToken); //No es JWT, pero es token único generado por OpenId
    console.log('USER: ', req.oidc.user);
    return JSON.stringify(req.oidc);
  }

  @ApiBearerAuth()
  @Put('edit')
  @UseGuards(AuthGuard)
  updateUserController(
    @Body() updatedUser: UpdateUserDto,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return this.usersService.updateUserService(updatedUser, userId);
  }

  @Put(':id')
  completeUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: completeUserDto,
  ) {
    return this.usersService.completeUser(id, user);
  }

  @ApiBearerAuth()
  @Patch('disable/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  disableUser(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.disableUserService(id);
  }

  @ApiBearerAuth()
  @Patch('favourite/property/add/:id')
  @UseGuards(AuthGuard)
  addFavoritePropertyController(
    @Param('id', ParseUUIDPipe) propertyId: string,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return this.usersService.addFavoritePropertyService(propertyId, userId);
  }

  @ApiBearerAuth()
  @Patch('favourite/property/remove/:id')
  @UseGuards(AuthGuard)
  removeFavoritePropertyController(
    @Param('id', ParseUUIDPipe) propertyId: string,
    @Req() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return this.usersService.removeFavoritePropertyService(propertyId, userId);
  }

}
