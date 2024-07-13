import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsService{
    GetAllProducts() {
        return 'all products'
    }
}