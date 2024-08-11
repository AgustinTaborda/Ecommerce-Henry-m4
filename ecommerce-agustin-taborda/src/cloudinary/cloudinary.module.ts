import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/entity/product.entity";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryConfig } from "../config/cloudinaryConfig";
import { CloudinaryRepository } from "./cloudinary.repository";
import { ProductsDbService } from "../products/productsDB.service";
import { Category } from "../categories/category.entity";

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