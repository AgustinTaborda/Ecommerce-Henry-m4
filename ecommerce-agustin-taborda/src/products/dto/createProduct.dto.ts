import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, max } from "class-validator";

export class createProductDto {
    @ApiProperty({
        description: 'El nombre del producto debe tener como máximo 50 caracteres',
        example: 'Monitor Samsung'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'led 23 pulgadas'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Debe ser un numero entero o decimal',
        example: '10.50'
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: 'Debe ser un numero entero',
        example: '10'
    })
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
        description: 'Debe ser una direccion url valida',
        example: 'http://localhost:3000/imagen-de-prueba'
    })
    @IsString()
    @IsNotEmpty()
    imgUrl?: string;

    @ApiProperty({
        description: 'Debe ser el id de una de las categorias validas',
        example: 'acd59afb-c73f-4a60-907f-e32cee025c29'
    })
    @IsString()
    @IsNotEmpty()
    category_id: string;
}