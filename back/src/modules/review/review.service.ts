import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  //-----------------------------------------------------------------------------------------
  //----------- Crear una nueva reseña (POST /reviews/create)
  //-----------------------------------------------------------------------------------------

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
    return { reviewId: newReview.id };

    /*
    //Código para devolver los id de user y property también

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
      */
  }

  //-----------------------------------------------------------------------------------------
  //------Obtener reseñas de un usuario específico (GET /reviews)----------------------------
  //-----------------------------------------------------------------------------------------

  async findAllReviewsService(userId: string) {
    try {
      const reviews = await this.reviewsRepository.find({
        where: { user: { id: userId } },
        relations: { property: true },
      });

      const reviewsWithPropertyId = reviews.map(
        ({ property, ...restReview }) => {
          return {
            ...restReview,
            property: { id: property.id },
          };
        },
      );
      return reviewsWithPropertyId;
    } catch (error) {
      throw new NotFoundException('Reviews not found or error with propertyId');
    }
  }

  //-----------------------------------------------------------------------------------------
  //----------- Actualizar una reseña (PUT /reviews/:reviewId)
  //-----------------------------------------------------------------------------------------

  async updateReviewService(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const reviewFound = await this.reviewsRepository.findOneBy({ id });
      if (!reviewFound) throw new NotFoundException('Review not found');

      const updatedReview = await this.reviewsRepository.update(
        id,
        updateReviewDto,
      );
      if (updatedReview.affected === 0)
        throw new BadRequestException('Review not updated');
      return { reviewId: id };
    } catch (error) {
      throw new BadRequestException('Cannot UpdateReview');
    }
  }
}
