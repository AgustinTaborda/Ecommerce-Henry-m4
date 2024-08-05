import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class createUserDto {
    
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
        message: 'Password too weak',
    })
    password: string;
    
    @IsNumber()
    @IsNotEmpty()
    phone: number;
    
    @IsString()
    @Length(5, 20)
    country: string;
    
    @IsString()
    @Length(3, 80)
    address: string;
    
    @IsString()
    @Length(5, 20)
    city: string;
}