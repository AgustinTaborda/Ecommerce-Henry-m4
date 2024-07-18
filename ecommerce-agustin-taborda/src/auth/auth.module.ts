import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/users/users.repository";
import { AuthGuard } from "./authGuard";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, AuthGuard]
})
export class AuthModule{};
