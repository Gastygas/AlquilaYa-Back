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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/authGuard';
import { ICustomRequest } from '../property/interface/customRequest';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //-----------------------------------------------------------------------------------------
  //------Obtener reseñas de una propiedad específica (GET /properties/:propertyId/reviews)
  //------Obtener reseñas de un usuario específico (GET /users/:userId/reviews)
  //-----------------------------------------------------------------------------------------

  // @Get()
  // findAll() {
  //   return this.reviewService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reviewService.findOne(+id);
  // }

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
  //----------- Actualizar una reseña (PUT /reviews/:reviewId)
  //-----------------------------------------------------------------------------------------

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  //-----------------------------------------------------------------------------------------
  //----------- Eliminar una reseña (DELETE /reviews/:reviewId)
  //-----------------------------------------------------------------------------------------

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reviewService.remove(+id);
  // }
}
