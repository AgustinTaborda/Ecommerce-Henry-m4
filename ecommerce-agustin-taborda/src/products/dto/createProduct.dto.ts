import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    imgUrl?: string;

    @IsString()
    @IsNotEmpty()
    category_id: string;
}