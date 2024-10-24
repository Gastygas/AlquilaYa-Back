import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
    @ApiProperty({example:"eaa0db31-08f5-45f0-aa49-6badcbef7468"})
    propertyId: string;

    @ApiProperty({example:Date()})
    dateStart: Date;

    dateEnd: Date;

}
