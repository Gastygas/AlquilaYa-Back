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
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard';
import { ICustomRequest } from '../property/interface/customRequest';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enum/user.roles.enum';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //-----------------------------------------------------------------------------------------
  //----------- Crear una nueva reseña (POST /reviews/create)
  //-----------------------------------------------------------------------------------------

  @ApiBearerAuth()
  @Post('create')
  @UseGuards(AuthGuard)
  createReviewController(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: ICustomRequest,
  ) {
    const userId = req.user.id;
    return this.reviewService.createReviewService(
      createReviewDto,
      userId,
      createReviewDto.propertyId,
    );
  }

  //-----------------------------------------------------------------------------------------
  //------Obtener reseñas de un usuario específico (GET /reviews)----------------------------
  //-----------------------------------------------(GET /users/:userId/reviews)?
  //-----------------------------------------------------------------------------------------

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAllReviewsController(@Request() req) {
    return this.reviewService.findAllReviewsService(req.user.id);
  }

  //-----------------------------------------------------------------------------------------
  //----------- Actualizar una reseña (PUT /reviews/:reviewId)-------------------------------
  //-----------------------------------------------------------------------------------------

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateReviewController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReviewService(id, updateReviewDto);
  }

  //-----------------------------------------------------------------------------------------
  //----------- Inhabilitar una reseña (PATCH /reviews/:reviewId)----------------------------
  //-----------------------------------------------------------------------------------------

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  changeStatusController(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.changeStatusService(id);
  }
}
