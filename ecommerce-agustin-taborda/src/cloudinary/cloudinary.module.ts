import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/entity/product.entity";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryConfig } from "src/config/cloudinaryConfig";
import { CloudinaryRepository } from "./cloudinary.repository";
import { ProductsDbService } from "src/products/productsDB.service";
import { Category } from "src/categories/category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category]),        
    ],
    providers: [
        ProductsDbService,
        CloudinaryService,
        CloudinaryRepository,
        CloudinaryConfig,
    ],
    controllers: [CloudinaryController]
})
export class CloudinaryModule {}