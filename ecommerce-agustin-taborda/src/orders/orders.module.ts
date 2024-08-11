import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { User } from "../users/entities/users.entity";
import { Product } from "../products/entity/product.entity";
import { OrderDetails } from "../orderDetails/orderDetails.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, User, Product, OrderDetails])
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}