import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class disableDayDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:"09/11/2024"
    })
    dateStart:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:"11/11/2024"
    })
    dateEnd:string;
}