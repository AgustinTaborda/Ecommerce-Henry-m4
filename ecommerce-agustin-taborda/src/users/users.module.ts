import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";
import { loggerMiddleware } from "src/middlewares/logger";

@Module({
    controllers: [UserController],
    providers: [UsersService]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(loggerMiddleware).forRoutes('users')
    }
}