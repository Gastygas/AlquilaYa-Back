import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  //-----------------------------------------------------------------------------------------
  //------Obtener reseñas de una propiedad específica (GET /properties/:propertyId/reviews)
  //------Obtener reseñas de un usuario específico (GET /users/:userId/reviews)
  //-----------------------------------------------------------------------------------------

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  //-----------------------------------------------------------------------------------------
  //----------- Crear una nueva reseña (POST /reviews)
  //-----------------------------------------------------------------------------------------

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  //-----------------------------------------------------------------------------------------
  //----------- Actualizar una reseña (PUT /reviews/:reviewId)
  //-----------------------------------------------------------------------------------------

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  //-----------------------------------------------------------------------------------------
  //----------- Eliminar una reseña (DELETE /reviews/:reviewId)
  //-----------------------------------------------------------------------------------------

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
