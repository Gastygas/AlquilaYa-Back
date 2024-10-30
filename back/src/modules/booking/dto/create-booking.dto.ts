import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({example:"eaa0db31-08f5-45f0-aa49-6badcbef7468"})
    propertyId: string

    @IsNotEmpty()
    @ApiProperty({example:"23/11/2024"})
    dateStart: string;

    @IsNotEmpty()
    @ApiProperty({example:"25/11/2024"})
    dateEnd: string;

}
