import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(type => User, user => user.orders_id)
    user_id: User;
    
    @Column()
    date: Date;
    
    @OneToOne(() => OrderDetails)
    @JoinColumn()
    orderDetails_id: OrderDetails;
}