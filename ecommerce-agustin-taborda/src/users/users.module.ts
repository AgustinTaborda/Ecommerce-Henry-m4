import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";
// import { loggerMiddleware } from "src/middlewares/logger";
import { UsersRepository } from "./users.repository";
import { AuthGuard } from "../auth/authGuard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UsersService, UsersRepository, AuthGuard],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(loggerMiddleware).forRoutes('users')
    }
}