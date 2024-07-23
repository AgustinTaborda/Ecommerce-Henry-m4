import { Category } from "src/categories/category.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'products'
})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name: string;

    @Column({
        type: "text",
        nullable: false
    })
    description: string;

    @Column({
        nullable: false,
        // precision: 10, 
        // scale: 2,
        type: 'decimal'
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: "text",
        nullable: false
    })
    imgUrl: string = './public/images/shopping-trolley.png';

    @ManyToOne(type => Category, category => category.products_id)
    category_id: Category;

    @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products_id)
    @JoinTable()
    orderDetails: OrderDetails[];
}