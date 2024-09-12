import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { createUserDto } from "../../users/dto/createUserDto";

export class CreateUserWithConfirmationDto  extends createUserDto{
    @ApiProperty({
        description: 'Confirmación de la contraseña',
        example: 'Password1!',
    })
    @IsString()
    @IsNotEmpty({
        message: 'La confirmación de la contraseña no puede estar vacía.',
    })
    passwordConfirmation: string;
}