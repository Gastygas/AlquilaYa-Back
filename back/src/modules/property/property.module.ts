import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { PropertyRepository } from './property.repository';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Property,User])],
  controllers: [PropertyController],
  providers: [PropertyService,PropertyRepository,UsersRepository],
})
export class PropertyModule {}
