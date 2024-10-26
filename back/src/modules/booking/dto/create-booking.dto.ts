import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @ApiProperty({example:"eaa0db31-08f5-45f0-aa49-6badcbef7468"})
    propertyId: string;

    @IsNotEmpty()
    @ApiProperty({example:"20/10/2024"})
    dateStart: string;

    @IsNotEmpty()
    @ApiProperty({example:"25/10/2024"})
    dateEnd: string;

}
