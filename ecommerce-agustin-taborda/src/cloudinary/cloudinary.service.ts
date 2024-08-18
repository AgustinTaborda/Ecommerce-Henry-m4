import { Injectable, NotFoundException } from "@nestjs/common";
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
        const product = await this.productService.getProductById(uuid);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.imgUrl) {
            const publicId = this.extractPublicId(product.imgUrl);
            
            if (publicId) {
                await this.cloudinaryRepository.deleteImage(publicId);
            }
        }
        
        const imageURL = await this.cloudinaryRepository.uploadImage(file);

        await this.productService.updateProduct(uuid, {imgUrl: imageURL.url} );

        return imageURL
    }

    async deleteImage(productId: string) {
        const product = await this.productService.getProductById(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.imgUrl) {
            const publicId = this.extractPublicId(product.imgUrl);
            
            if (publicId) {
                await this.cloudinaryRepository.deleteImage(publicId);
                await this.productService.updateProduct(productId, {imgUrl: ''} );
                return 'Image was correctly deleted'
            } else {
                return 'Error finding product image'
            }
        }
    }

    private extractPublicId(cloudinaryUrl: string): string | null {
        const match = cloudinaryUrl.match(/\/([^\/]+)\.[a-zA-Z]{3,4}$/);
        return match ? match[1] : null;
    }

}