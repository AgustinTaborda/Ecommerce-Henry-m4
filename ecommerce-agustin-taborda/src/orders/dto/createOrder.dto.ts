import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/entity/product.entity"

export class CreateOrderDto {
    @ApiProperty({
        description: 'Debe ser el id de un usuario valido',
        example: '6dbd0627-1499-479c-81df-3b843a4ee330'
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        description: 'Debe ser el conjunto de los IDs de los productos que corresponden a esta orden',
        example: [{"id":'f4acd736-ad16-4470-9a42-e755193750fa'}]
    })
    @IsNotEmpty()
    @ArrayMinSize(1, { message: 'At least one product must be included in the order' })
    products: Partial<Product>[]
}