import { PickType } from "@nestjs/swagger"
import { createUserDto } from "../../users/dto/createUserDto";

export class CredentialsDto extends PickType(createUserDto,["email", "password"]) {
}