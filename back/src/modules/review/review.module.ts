import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/reviews.entity';
import { User } from 'src/entities/user.entity';
import { Property } from 'src/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews, User, Property])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
