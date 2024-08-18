import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../products/entity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'categories'
})
export class Category{
    @ApiProperty({
        description: 'Id autogenerada de la categoría',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre de la categoría',
        example: 'speakers'
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

    @ApiProperty({
        type: 'uuid',
        description: 'Id de los productos incluidos en esta categoría',
        example: 'f4acd736-ad16-4470-9a42-e755193750fa'
    })
    @OneToMany(type => Product, product => product.category_id )
    products_id: Product[];
}