import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { AuthGuard } from "src/auth/authGuard";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, AuthGuard]
})
export class ProductsModule{}