import { Exclude } from "class-transformer";
import { Order } from "src/orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'users'
})
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: "varchar",
        length: 80,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: false,
        nullable: false
    })
    email: string;
    
    @Column({
        // type: "varchar",
        // length: 15,
        // nullable: false
    })
    // @Exclude({ toPlainOnly: true })
    password: string;
    
    @Column({
        type: "bigint",
        nullable: true
    })
    phone: number;
    
    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    country: string;
    
    @Column({
        type: "text",
        nullable: true,
    })
    address: string;
    
    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    city: string;
    
    @OneToMany(type => Order, order => order.user_id)
    orders_id: Order[];
}