import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";
import { loggerMiddleware } from "src/middlewares/logger";
import { UsersRepository } from "./users.repository";

@Module({
    controllers: [UserController],
    providers: [UsersService, UsersRepository]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(loggerMiddleware).forRoutes('users')
    }
}