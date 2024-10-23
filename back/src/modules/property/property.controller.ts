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
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from 'src/guards/authGuard';
import { CustomRequest } from './interface/customRequest';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  getAllPropertiesController(){
    return this.propertyService.getAllPropertiesService()
  }


  @ApiBearerAuth()
  @Post()

  @UseGuards(AuthGuard)
  createPropertyController(
    @Body() newProperty:CreatePropertyDto,
    @Request() req: CustomRequest,
  ) {
      const id = req.user.id
      return this.propertyService.createProperty(newProperty,id);

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
