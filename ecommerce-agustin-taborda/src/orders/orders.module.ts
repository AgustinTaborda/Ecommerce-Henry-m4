import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { User } from "src/users/entities/users.entity";
import { Product } from "src/products/entity/product.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, User, Product, OrderDetails])
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}