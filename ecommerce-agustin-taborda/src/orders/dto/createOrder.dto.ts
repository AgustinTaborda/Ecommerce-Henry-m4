import { Type } from "class-transformer"
import { ArrayMinSize, IsNotEmpty, IsString, IsUUID, Length, ValidateNested } from "class-validator"
import { Product } from "src/products/entity/product.entity"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    @ArrayMinSize(1, { message: 'At least one product must be included in the order' })
    products: Partial<Product>[]
}