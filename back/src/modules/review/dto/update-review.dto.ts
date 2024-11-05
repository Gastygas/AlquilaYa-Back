import { PickType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PickType(CreateReviewDto, [
  'stars',
  'description',
]) {}
