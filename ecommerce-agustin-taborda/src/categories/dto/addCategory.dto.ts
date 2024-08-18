import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class addCategoryDto {
    @ApiProperty({
        description: 'EL nombre de la categoría',
        example: 'Speakers'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}