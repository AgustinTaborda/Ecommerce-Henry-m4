import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, Min, MinLength } from "class-validator";

export class createUserDto {
    
    @ApiProperty({
        description: 'El nombre del usuario debe tener como minimo 3 caracteres',
        example: 'Fabrizio'
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string;
    
    @ApiProperty({
        description: 'El email debe ser un email valido',
        example: 'example@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({
        description: 'La password debe ser una contraseña dificil de encontrar',
        example: 'Password1!'
    })
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.'}
    )
    password: string;
    
    @ApiProperty({
        description: 'El phone debe ser un numero entero',
        example: '123456789'
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1000000)
    phone: number;
    
    @ApiProperty({
        description: 'El pais originario del usuario',
        example: 'Argentina'
    })
    @IsString()
    @Length(5, 20)
    country: string;
    
    @ApiProperty({
        description: 'La direccion residencial del usuario',
        example: 'Random street 123'
    })
    @IsString()
    @Length(3, 80)
    address: string;
    
    @ApiProperty({
        description: 'La ciudad donde reside el usuario',
        example: 'Cordoba'
    })
    @IsString()
    @Length(5, 20)
    city: string;
}