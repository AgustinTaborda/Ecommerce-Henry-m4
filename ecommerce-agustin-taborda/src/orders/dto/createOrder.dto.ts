import { ArrayMinSize, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/entity/product.entity"

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    @ArrayMinSize(1, { message: 'At least one product must be included in the order' })
    products: Partial<Product>[]
}