import { PickType } from "@nestjs/swagger"
import { createUserDto } from "src/users/dto/createUserDto";

export class CredentialsDto extends PickType(createUserDto,["email", "password"]) {
}