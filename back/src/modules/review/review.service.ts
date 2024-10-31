import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/entities/reviews.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { log } from 'console';
import { Property } from 'src/entities/property.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Reviews) private reviewsRepository: Repository<Reviews>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}
  async createReviewService(
    review: Partial<Reviews>,
    userId: string,
    propertyId: string,
  ) {
    review.user = await this.usersRepository.findOneBy({ id: userId });
    if (!review.user)
      throw new NotFoundException(`User id: ${userId} not found`);

    review.property = await this.propertyRepository.findOneBy({
      id: propertyId,
    });
    if (!review.property) throw new NotFoundException(`Property id not found`);

    const newReview = await this.reviewsRepository.save(review);
    const newReviewDb = await this.reviewsRepository.findOne({
      where: { id: newReview.id },
      relations: { user: true, property: true },
    });

    const { user, property, ...restNewReviewDb } = newReviewDb;
    return {
      ...restNewReviewDb,
      user: { id: user.id },
      property: { id: property.id },
    };
  }

  //   // findAll() {
  //   //   return `This action returns all review`;
  //   // }

  //   // findOne(id: number) {
  //   //   return `This action returns a #${id} review`;
  //   // }

  //   // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   //   return `This action updates a #${id} review`;
  //   // }

  //   // remove(id: number) {
  //   //   return `This action removes a #${id} review`;
  //   // }
}
