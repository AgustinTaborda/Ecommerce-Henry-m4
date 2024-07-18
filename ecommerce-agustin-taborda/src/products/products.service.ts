import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.interface";

@Injectable()
export class ProductsService{
    constructor(private readonly productsRepository:ProductsRepository){}
    
    GetAllProducts(page: number, limit:number) {
        return this.productsRepository.getProducts( page, limit )
    }
    
    getProductById(id: string) {
        return this.productsRepository.getProductById(Number(id))
    }
    
    updateProduct(id: string, updateProductDto: Omit<Product, "id">) {
        return this.productsRepository.updateProduct(Number(id), updateProductDto)
    }
    
    createProduct(createDto: Omit<Product, "id">) {
        return this.productsRepository.createProduct(createDto)
    }
    
    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(Number(id))
    }
}