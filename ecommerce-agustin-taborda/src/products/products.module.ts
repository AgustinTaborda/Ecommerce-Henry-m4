import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { AuthGuard } from "../auth/authGuard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { ProductsDbService } from "./productsDB.service";
import { Category } from "../categories/category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category])
    ],
    controllers: [ProductsController],
    providers: [
        ProductsService, 
        ProductsDbService,
        ProductsRepository, 
        AuthGuard]
})
export class ProductsModule{}