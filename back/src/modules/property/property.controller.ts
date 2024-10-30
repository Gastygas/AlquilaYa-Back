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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AuthGuard } from 'src/guards/authGuard';
import { ICustomRequest } from './interface/customRequest';
import { disableDayDto } from './dto/disableday.dto';
import { Role } from 'src/decorators/roles.decorator';
import { Roles } from '../users/enum/user.roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadRespository } from '../file-upload/file-upload.repository';
import { FileUploadService } from '../file-upload/file-upload.service';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService,
    private readonly fileUploadService: FileUploadService
  
  ) {}

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




// @Post()
// @UseGuards(AuthGuard)
// @UseInterceptors(FileInterceptor('file'))
// @ApiBearerAuth()
// @ApiConsumes('multipart/form-data') // Usa solo el tipo
// async createPropertyWithImage(
//   @Request() req: ICustomRequest,
//   @Body(new ParseCreatePropertyPipe(), new ValidationPipe({ transform: true })) newProperty: CreatePropertyDto,
//   @UploadedFile(new ParseFilePipe({
//     validators: [
//       new MaxFileSizeValidator({ maxSize: 200000 }),
//       new FileTypeValidator({ fileType: /(.jpg|.jpeg|.png|.webp)$/ }),
//     ],
//   })) file?: Express.Multer.File
// ) {
//   const userId = req.user.id;
  
//   console.log('newProperty: ',newProperty);
  
//   // Crear propiedad
//   const property = await this.propertyService.createProperty(newProperty, userId);
  
//   const { id } = property.property.property
//   // Subir archivo si existe
//   if (file) {
//     await this.fileUploadService.uploadImageToProperty(id, file);
//   }

//   return property;
// }

////////////////////////////////////////
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

////////////////////////////////////////
  @ApiBearerAuth()
  @Patch("approve/:id")
  @Role(Roles.Admin)
  @UseGuards(AuthGuard)
  approvePropertyController(
    @Param('id', ParseUUIDPipe) id:string
  ){
    return this.propertyService.approvePropertyService(id)
  }

  @ApiBearerAuth()
  @Patch("deny/:id")
  @Role(Roles.Admin)
  @UseGuards(AuthGuard)
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
