import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../categories/category.entity";
import { OrderDetails } from "../../orderDetails/orderDetails.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'products'
})
export class Product {
    @ApiProperty({
        description: 'El id autogenerado del producto',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre del producto debe tener como máximo 50 caracteres',
        example: 'Monitor Samsung'
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'led 23 pulgadas'
    })
    @Column({
        type: "text",
        nullable: false
    })
    description: string;

    @ApiProperty({
        description: 'Debe ser un numero entero o decimal',
        example: '10.50'
    })
    @Column({
        nullable: false,
        // precision: 10, 
        // scale: 2,
        type: 'decimal'
    })
    price: number;

    @ApiProperty({
        description: 'Debe ser un numero entero',
        example: '10'
    })
    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @ApiProperty({
        description: 'Debe ser una direccion url valida',
        example: 'http://localhost:3000/imagen-de-prueba'
    })
    @Column({
        type: "text",
        nullable: false
    })
    imgUrl: string = './public/images/shopping-trolley.png';

    @ApiProperty({
        description: 'Debe ser el id de una de las categorias validas',
        example: 'acd59afb-c73f-4a60-907f-e32cee025c29'
    })
    @ManyToOne(() => Category, category => category.products_id)
    category_id: Category;

    @ApiProperty({
        description: 'El id de los detalle de orden que contienen este producto',
        example: 'acd59afb-c73f-4a60-907f-e32cee025c29'
    })
    @ManyToMany(type => OrderDetails, orderDetails => orderDetails.products_id)
    @JoinTable()
    orderDetails: OrderDetails[];
}