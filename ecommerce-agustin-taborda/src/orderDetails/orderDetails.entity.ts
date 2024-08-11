import { Product } from "../products/entity/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: "orderDetails"
})
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'decimal',
        precision: 10, 
        scale: 2,
        nullable: false
    })
    price: Number;

    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable()
    products_id: Product[];
}