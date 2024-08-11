import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { In, Repository } from "typeorm";
import { User } from "../users/entities/users.entity";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { Product } from "../products/entity/product.entity";
import { OrderDetails } from "../orderDetails/orderDetails.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) 
        private ordersRepository:Repository<Order>,
        @InjectRepository(User)
        private usersRepository:Repository<User>,
        @InjectRepository(Product)
        private productRepository:Repository<Product>,
        @InjectRepository(OrderDetails)
        private orderDetailsRepository: Repository<OrderDetails>
    ) {}
    
    async addOrder(createOrderDto:CreateOrderDto) {
        const {userId , products}: CreateOrderDto = createOrderDto; 

        // Verificar que el usuario existe
        const user:User = await this.usersRepository.findOne({where: {id: userId}});
        if(!user) {
            throw new NotFoundException('User not found.')
        }

        // Obtener productos por sus IDs
        const productIds = products.map( product => product.id);
        const productEntities = await this.productRepository.findBy({id:In(productIds)});
        if (productEntities.length !== productIds.length) {
            throw new NotFoundException('One or more products not found');
        }

        // Verificar que todos los productos tienen stock suficiente
        const insufficientStock = productEntities.some(product => product.stock <= 0);
        if (insufficientStock) {
            throw new NotFoundException('One or more products are out of stock.');
        };

        // Calcular el precio total
        const calculateTotalPrice = (products: Product[]): number => {
            let total = 0;
            for (const product of products) {                
                total += Number(product.price);
            }
            return total; 
        }

        // Crear OrderDetails
        const orderDetails:OrderDetails = this.orderDetailsRepository.create({
            products_id: productEntities,
            price: calculateTotalPrice(productEntities), 
        });        

        // Guardar OrderDetails
        const savedOrderDetails:OrderDetails = await this.orderDetailsRepository.save(orderDetails);

        // Crear nueva orden
        const newOrder = this.ordersRepository.create({
            user_id: user, 
            date: new Date(),
            orderDetails_id: savedOrderDetails
        })

        // Guardar nueva orden
        await this.ordersRepository.save(newOrder);

        // Actualizar stock de productos
        for (const product of productEntities) {
            product.stock -= 1;
            await this.productRepository.save(product);
        }

        return newOrder;
    }

    async getOrder(orderId:string) {
        const results = await this.ordersRepository.findOne({
            where:{ id: orderId },
            relations: {
                user_id: true,
                orderDetails_id: {
                    products_id: true 
                }
            }
        });

        if (!results) {
            throw new NotFoundException('Order not found')
        }

        return results
    }    
}