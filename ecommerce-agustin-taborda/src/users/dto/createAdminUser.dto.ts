import { IsNotEmpty } from "class-validator";
import { createUserDto } from "./createUserDto";

export class CreateAdminUserDto extends createUserDto {
    @IsNotEmpty()
    isAdmin: boolean
}