import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryRepository } from "./cloudinary.repository";
import { Product } from "../products/entity/product.entity";
import { Repository } from "typeorm";
import { ProductsDbService } from "../products/productsDB.service";

@Injectable()
export class CloudinaryService {
    constructor(
        @InjectRepository(Product) 
        private readonly productRepository:Repository<Product>,
        private readonly cloudinaryRepository:CloudinaryRepository,
        private readonly productService:ProductsDbService
    ) {}
 
    async uploadImage(uuid:string ,file:Express.Multer.File) {        
        const imageURL = await this.cloudinaryRepository.uploadImage(file);
        
        const updateProduct: any = {
            imgUrl: imageURL.url,
        };

        // this.productService.updateProduct(uuid, updateProduct);
        this.productService.updateProduct(uuid, {imgUrl: imageURL.url} );

        return imageURL
    }

}