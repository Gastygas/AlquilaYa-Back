import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from 'src/guards/authGuard';
import { ICustomRequest } from './interface/customRequest';
import { disableDayDto } from './dto/disableday.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enum/user.roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getAllPropertiesController(){
    return this.propertyService.getAllPropertiesService()
  }

  @Get(":id")
  getPropertyByIdController(
    @Param('id',ParseUUIDPipe) id:string
  ){
    return this.propertyService.getPropertyById(id)
  }


  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createPropertyController(
    @Body() newProperty:CreatePropertyDto,
    @Request() req: ICustomRequest,
  ) {
      const userId = req.user.id
      return this.propertyService.createProperty(newProperty,userId);
  }

  @ApiBearerAuth()
  @Patch("approve/:id")
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  approvePropertyController(
    @Param('id', ParseUUIDPipe) id:string
  ){
    return this.propertyService.approvePropertyService(id)
  }

  @ApiBearerAuth()
  @Patch("deny/:id")
  @Roles(Role.Admin)
  @UseGuards(AuthGuard,RolesGuard)
  denyPropertyController(
    @Param('id', ParseUUIDPipe) id:string
  ){
    return this.propertyService.denyPropertyService(id)
  }


  @Patch("reserve/:id")
  // @UseGuards(AuthGuard)
  addReservedDaysController(
    @Param('id',ParseUUIDPipe) propertyId: string,
    @Body() dates: disableDayDto,
  ){
    return this.propertyService.addReservedDaysService(propertyId,dates)
  }

  @Patch("disable/:id")
  // @UseGuards(AuthGuard)
  addDisableDaysController(
    @Param('id',ParseUUIDPipe) propertyId: string,
    @Body() dates: disableDayDto,
  ){
    return this.propertyService.addDisableDaysService(propertyId,dates)
  }


  @Patch("cancel/disable/:id")
  // @UseGuards(AuthGuard)
  cancelDisableDaysController(
    @Param('id',ParseUUIDPipe) propertyId: string,
    @Body() dates: disableDayDto,
  ){
    return this.propertyService.cancelDisableDaysService(propertyId,dates)
  }



  // //-----------------------------------------------------------------------------------------
  // //-----------------------------------------------------------------------------------------

  @Post('seeder')
  addPropertiesController() {
    return this.propertyService.addPropertiesService();
  }

  // //-----------------------------------------------------------------------------------------
  // //-----------------------------------------------------------------------------------------

  // @Get()
  // findAll() {
  //   return this.propertyService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePropertyDto) {
  //   return this.propertyService.update(+id, updatePropertyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertyService.remove(+id);
  // }
}
