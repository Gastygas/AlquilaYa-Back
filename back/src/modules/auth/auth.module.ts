import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { GoogleStrategy } from 'src/google.strategy/google.strategy';
import { EmailService } from '../email/email.service';
import { PropertyRepository } from '../property/property.repository';
import { Property } from 'src/entities/property.entity';
import { EmailRepository } from '../email/email.repository';
import { Email } from 'src/entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Property,Email])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, GoogleStrategy,EmailService,PropertyRepository,EmailRepository],
})
export class AuthModule {}
