import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailService } from '../email/email.service';
import { PropertyRepository } from '../property/property.repository';
import { Property } from 'src/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Property])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,EmailService,PropertyRepository],
})
export class UsersModule {}
