import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { default as data } from '../../../src/utils/dataProperty.json';
import { UsersRepository } from '../users/users.repository';
import { User } from 'src/entities/user.entity';
import { IPropertyWithUserId } from './interface/propertyWithUserId';
import { format, addDays, isBefore, parse } from 'date-fns';
import { disableDayDto } from './dto/disableday.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly userRepository: UsersRepository,
    private readonly emailService: EmailService,
  ) {}

  async getAllPropertiesRepository(
    page = 1,
    limit = 50,
  ): Promise<IPropertyWithUserId[]> {
    const properties = await this.propertyRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        specialprice: true,
        user: true,
      },
    });

    const propertiesWithUserId = properties.map((property) => {
      const { user, ...restProperty } = property;
      return {
        ...restProperty,
        user: { id: user.id },
      };
    });

    return propertiesWithUserId;
  }

  async getPropertyById(id: string): Promise<IPropertyWithUserId> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!property) throw new BadRequestException('Property Id not found');
    const { user, ...restProperty } = property;
    return {
      ...restProperty,
      user: { id: user.id },
    };
  }

  async createProperty(newProperty: CreatePropertyDto, id: string) {
    if(newProperty.type === "departamento" || newProperty.type === "hotel"){
      const propertyExits: Property = await this.propertyRepository.findOne({
        where: { address: newProperty.address, floor: newProperty.floor, room: newProperty.room },
      });
      if(propertyExits) throw new BadRequestException("Address already used")
    } else if(newProperty.type !== "departamento" && newProperty.type !== "hotel"){
      const propertyExits: Property = await this.propertyRepository.findOne({
        where: { address: newProperty.address },
      });
      if(propertyExits) throw new BadRequestException("Address already used")
    }

    const userDb: Omit<User, 'password'> = await this.userRepository.getUserById(id);
    if (!userDb) throw new BadRequestException('user id not found');
  
    const createProperty: Property = await this.propertyRepository.create({
      user: userDb,
      ...newProperty,
    });
    const savedProperty = await this.propertyRepository.save(createProperty);
  
    const property: Property = await this.propertyRepository.findOne({
      where: { id: savedProperty.id },
    });
  
    return {
      success: 'Your property is Pending, we will notice you soon',
      property: { property, userId: userDb.id },
    };
  }

  async approvePropertyRepository(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!property) throw new BadRequestException('property not found');
    if ((property.propertyStatus as string) === 'approved')
      throw new BadRequestException('Property already approved');
    property.propertyStatus = 'approved';
    await this.propertyRepository.save(property);

    // await this.emailService.sendEmailCreatePropertySuccessfully(property.user.email,property.user.name,property.id)
    return { success: 'Congratulations, your property was approved!' };
  }

  async denyPropertyRepository(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!property) throw new BadRequestException('property not found');
    if ((property.propertyStatus as string) === 'cancelled')
      throw new BadRequestException('Property already cancelled');
    property.propertyStatus = 'cancelled';
    await this.propertyRepository.save(property);

    // await this.emailService.sendEmailCreatePropertyDeny(property.user.email,property.user.name)
    return { success: 'Sorry, your property was disapproved' };
  }

  async addPropertiesRepository() {
    const users = await this.userRepository.getAllUsers();
    if (!users) throw new BadRequestException('users not found');
    let j = 0;

    for (let i = 0; i < data.length; i++) {
      if (j == users.length) j = 0;
      this.createProperty(data[i], users[j].id);
      j++;
    }
    return { success: 'properties has been added' };
  }

  async addReservedDaysRepository(propertyId: string, dates: disableDayDto) {
    const property: Property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });
    if (!property) throw new BadRequestException('Property not found');

    const { dateStart, dateEnd } = dates;
    const startDate = parse(dateStart, 'dd/MM/yyyy', new Date());
    const endDate = parse(dateEnd, 'dd/MM/yyyy', new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegurarse de eliminar la hora para comparar solo la fecha

    // Validar si dateStart es una fecha anterior a hoy
    if (isBefore(startDate, today) || isBefore(endDate, startDate)) {
      throw new BadRequestException('Invalid dates');
    }

    let current = startDate;
    const reserveDaysArray: string[] = [];

    // Convertir fechas en disableDays a formato "dd/MM/yyyy"
    const formattedReserveDays = property.reservedDays.map((date) => {
      const parsedDate = new Date(date);
      return format(parsedDate, 'dd/MM/yyyy');
    });
    const formattedDisableDays = property.disableDays.map((date) => {
      const parsedDate = new Date(date);
      return format(parsedDate, 'dd/MM/yyyy');
    });

    // Generar fechas en el rango y verificar si ya están reservadas
    while (
      isBefore(current, endDate) ||
      current.getTime() === endDate.getTime()
    ) {
      const formattedDate = format(current, 'dd/MM/yyyy');
      if (formattedReserveDays.includes(formattedDate))
        throw new BadRequestException(
          'Dates are reserved, please take other ones',
        );
      if (formattedDisableDays.includes(formattedDate))
        throw new BadRequestException(
          'Dates are Disabled, please take other ones',
        );

      reserveDaysArray.push(formattedDate);
      current = addDays(current, 1);
    }
    // Actualizar disableDays con las nuevas fechas en formato ISO
    const newReserveDays = reserveDaysArray.map((date) => {
      const [day, month, year] = date.split('/');
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      ).toISOString();
    });

    // Actualizar reservedDays
    property.reservedDays = [...property.reservedDays, ...newReserveDays];
    await this.propertyRepository.save(property);

    return { success: 'The days are reserved now' };
  }

  async addDisableDaysRepository(propertyId: string, dates: disableDayDto) {
    const property: Property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });
    if (!property) throw new BadRequestException('Property not found');

    const { dateStart, dateEnd } = dates;
    const startDate = parse(dateStart, 'dd/MM/yyyy', new Date());
    const endDate = parse(dateEnd, 'dd/MM/yyyy', new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegurarse de eliminar la hora para comparar solo la fecha

    // Validar si dateStart es una fecha anterior a hoy
    if (isBefore(startDate, today) || isBefore(endDate, startDate)) {
      throw new BadRequestException('Invalid dates');
    }

    let current = startDate;
    const disableDaysArray: string[] = [];

    // Convertir fechas en disableDays a formato "dd/MM/yyyy"
    const formattedDisableDays = property.disableDays.map((date) => {
      const parsedDate = new Date(date);
      return format(parsedDate, 'dd/MM/yyyy');
    });
    const formattedReservedDays = property.reservedDays.map((date) => {
      const parsedDate = new Date(date);
      return format(parsedDate, 'dd/MM/yyyy');
    });

    // Generar fechas en el rango y verificar si ya están reservadas
    while (
      isBefore(current, endDate) ||
      current.getTime() === endDate.getTime()
    ) {
      const formattedDate = format(current, 'dd/MM/yyyy');
      if (formattedDisableDays.includes(formattedDate))
        throw new BadRequestException(
          'Dates are Disabled, please take other ones',
        );
      if (formattedReservedDays.includes(formattedDate))
        throw new BadRequestException(
          'Dates are Reserved, please take other ones',
        );

      disableDaysArray.push(formattedDate);
      current = addDays(current, 1);
    }
    // Actualizar disableDays con las nuevas fechas en formato ISO
    const newDisableDays = disableDaysArray.map((date) => {
      const [day, month, year] = date.split('/');
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      ).toISOString();
    });

    // Actualizar disableDays
    property.disableDays = [...property.disableDays, ...newDisableDays];
    await this.propertyRepository.save(property);

    return { success: 'The days are disable now' };
  }

  async cancelBookDays(propertyId: string, dates: disableDayDto) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: { user: true, bookings: true },
    });
    if (!property) throw new BadRequestException('Property Id not found');

    const { dateStart, dateEnd } = dates;
    const startDate = parse(dateStart, 'dd/MM/yyyy', new Date());
    const endDate = parse(dateEnd, 'dd/MM/yyyy', new Date());

    let current = startDate;
    let cancelDaysArr: string[] = [];

    while (
      isBefore(current, endDate) ||
      current.getTime() === endDate.getTime()
    ) {
      const formattedDate = format(current, 'dd/MM/yyyy');
      cancelDaysArr.push(formattedDate);
      current = addDays(current, 1);
    }

    // Convertir las fechas en disableDays al formato "dd/MM/yyyy" antes de comparar
    property.reservedDays = property.reservedDays.filter((reserveDate) => {
      const formattedDisableDate = format(new Date(reserveDate), 'dd/MM/yyyy');
      return !cancelDaysArr.includes(formattedDisableDate);
    });

    await this.propertyRepository.save(property);

    return { success: 'The reserved days are free now' };
  }

  async cancelDisableDays(propertyId: string, dates: disableDayDto) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: { user: true, bookings: true },
    });
    if (!property) throw new BadRequestException('Property Id not found');

    const { dateStart, dateEnd } = dates;
    const startDate = parse(dateStart, 'dd/MM/yyyy', new Date());
    const endDate = parse(dateEnd, 'dd/MM/yyyy', new Date());

    let current = startDate;
    let cancelDaysArr: string[] = [];

    while (
      isBefore(current, endDate) ||
      current.getTime() === endDate.getTime()
    ) {
      const formattedDate = format(current, 'dd/MM/yyyy');
      cancelDaysArr.push(formattedDate);
      current = addDays(current, 1);
    }

    // Convertir las fechas en disableDays al formato "dd/MM/yyyy" antes de comparar
    property.disableDays = property.disableDays.filter((disableDate) => {
      const formattedDisableDate = format(new Date(disableDate), 'dd/MM/yyyy');
      return !cancelDaysArr.includes(formattedDisableDate);
    });

    await this.propertyRepository.save(property);

    return { success: 'The disabled days are free now' };
  }

  //-----------------------------------------------------------------------------------------
  //------Obtener reseñas de una propiedad específica (GET /property/reviews/:id)
  //-----------------------------------------------------------------------------------------

  async getReviewsOfPropertyByIdRepository(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: { reviews: true },
    });
    if (!property) throw new BadRequestException('Property Id not found');

    const { reviews, ...restProperty } = property;
    const reviewsActive = reviews.filter((review) => review.status);
    return reviewsActive;
  }
}
