import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../products/entity/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: "orderDetails"
})
export class OrderDetails {
    @ApiProperty({
        description: 'Id autogenerada de la orden',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: "number",
        description: 'El precio total de la orden',
        example: '120,50'
    })
    @Column({
        type: 'decimal',
        precision: 10, 
        scale: 2,
        nullable: false
    })
    price: Number;

    @ApiProperty({
        description: "El id de los productos que integran este detalle de orden",
        example: "9fb1b179-a413-4ae2-83e6-759d2b7ba24d"
    })
    @ManyToMany(type => Product, product => product.orderDetails)
    @JoinTable()
    products_id: Product[];
}