import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity({
    name: 'users'
})
export class User {
    @ApiProperty({
        description: 'Id autogenerada del usuario',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ApiProperty({
        description: 'El nombre del usuario debe tener como minimo 3 caracteres',
        example: 'Fabrizio'
    })
    @Column({
        type: "varchar",
        length: 80,
        nullable: false
    })
    name: string;

    @ApiProperty({
        description: 'Indica si es usuario administrador o no',
    })
    @Column({default: false})
    isAdmin: boolean;

    @ApiProperty({
        description: 'El email debe ser un email valido',
        example: 'example@gmail.com'
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: false,
        nullable: false
    })
    email: string;
    
    @ApiProperty({
        description: 'La password debe ser una contraseña dificil de encontrar',
        example: 'Password1!'
    })
    @Column()
    password: string;
    
    @ApiProperty({
        description: 'El phone debe ser un numero entero',
        example: '123456789'
    })
    @Column({
        type: "bigint",
        nullable: true
    })
    phone: number;
    
    @ApiProperty({
        description: 'El pais originario del usuario',
        example: 'Argentina'
    })
    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    country: string;
    
    @ApiProperty({
        description: 'La direccion residencial del usuario',
        example: 'Random street 123'
    })
    @Column({
        type: "text",
        nullable: true,
    })
    address: string;
    
    @ApiProperty({
        description: 'La ciudad donde reside el usuario',
        example: 'Cordoba'
    })
    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    city: string;
    
    @ApiProperty({
        description: 'Conjunto de ordenes que ha realizado el usuario',
    })
    @OneToMany(type => Order, order => order.user_id)
    orders_id: Order[];
}