import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EmailService } from '../email/email.service';
import { PropertyRepository } from '../property/property.repository';
import { Property } from 'src/entities/property.entity';
import { EmailRepository } from '../email/email.repository';
import { Email } from 'src/entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Property,Email])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,EmailService,PropertyRepository,EmailRepository],
})
export class UsersModule {}
