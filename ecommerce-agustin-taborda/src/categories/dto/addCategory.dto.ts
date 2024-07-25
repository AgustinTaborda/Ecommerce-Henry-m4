import { IsNotEmpty, IsString } from "class-validator";

export class addCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}