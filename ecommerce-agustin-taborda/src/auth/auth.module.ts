import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../users/users.repository";
import { AuthGuard } from "./authGuard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, AuthGuard]
})
export class AuthModule{};
