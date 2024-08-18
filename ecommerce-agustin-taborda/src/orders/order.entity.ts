import { ApiProperty } from "@nestjs/swagger";
import { OrderDetails } from "../orderDetails/orderDetails.entity";
import { User } from "../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'orders'
})
export class Order {
    @ApiProperty({
        description: 'Id autogenerada de la orden',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        type: 'uuid',
        description: 'Debe ser el id de un usuario valido',
        example: '6dbd0627-1499-479c-81df-3b843a4ee330'
    })
    @ManyToOne(type => User, user => user.orders_id)
    user_id: User;
    
    @ApiProperty({
        description: 'La fecha de creación de la orden',
        example: '13-05-20224'
    })
    @Column()
    date: Date;
    
    @ApiProperty({
        description: 'El id del detalle de la orden',
        example: '6dbd0627-1499-479c-81df-3b843a4ee330'
    })
    @OneToOne(type => OrderDetails)
    @JoinColumn()
    orderDetails_id: OrderDetails;
}