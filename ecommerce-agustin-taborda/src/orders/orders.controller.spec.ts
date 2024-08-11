import { OrdersController } from "./orders.controller"
import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../products/entity/product.entity";
import { OrderDetails } from "../orderDetails/orderDetails.entity";
import { User } from "../users/entities/users.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { HttpStatus } from "@nestjs/common";

describe('OrdersController', () => {
    let ordersController:OrdersController;
    let mockUserRepository:Partial<Repository<User>>;
    let mockOrdersRepository:Partial<Repository<Order>>;
    let mockProductsRepository:Partial<Repository<Product>>;
    let mockOrdersDetailsRepository:Partial<Repository<OrderDetails>>;
    let mockJwtService:Partial<JwtService>;

    let mockOrder = {
        id: 'string',
        user_id: new User,
        date: new Date,
        orderDetails_id: new OrderDetails,
    };
    let mockProduct = new Product;

    let mockCreateOrderDto: CreateOrderDto = {
        userId: 'uuid-valid',
        products: [mockProduct]
    }

    beforeEach( async () => {
        mockUserRepository = {
            findOne: () => null
        };

        mockProductsRepository = {
            findBy: () => null
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },
                {
                    provide:'UserRepository',
                    useValue: mockUserRepository
                },
                {
                    provide:'OrderRepository',
                    useValue: mockOrdersRepository
                },
                {
                    provide:'ProductRepository',
                    useValue: mockProductsRepository
                },
                {
                    provide:'OrderDetailsRepository',
                    useValue: mockOrdersDetailsRepository
                },
            ],
            controllers: [OrdersController]
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
    });


    it('Should create an instance of ordersController', async () => {
        expect(ordersController).toBeDefined();
    });

    it('addOrder() should return a new order', async () => {
        jest.spyOn(OrdersService.prototype, 'addOrder').mockResolvedValue(mockOrder);

        const order = await ordersController.addOrder(mockCreateOrderDto);
        expect(order).toBeDefined();
        expect(order).toBeInstanceOf(Object);    
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('user_id');
        expect(order).toHaveProperty('date');
        expect(order).toHaveProperty('orderDetails_id');
    });
    
    it('getOrder() should return a new order', async () => {
        jest.spyOn(OrdersService.prototype, 'getOrder').mockResolvedValue(mockOrder);

        const order = await ordersController.getOrder(mockOrder.id);
        expect(order).toBeDefined();
        expect(order).toBeInstanceOf(Object);    
        expect(order).toHaveProperty('id');
        expect(order).toHaveProperty('user_id');
        expect(order).toHaveProperty('date');
        expect(order).toHaveProperty('orderDetails_id');
    });

    it('addOrder() should return an error if the user does not exist', async () => {
        try {
            await ordersController.addOrder(mockCreateOrderDto);
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error.status).toBe(HttpStatus.NOT_FOUND);
            expect(error.message).toBe('User not found.');
        }
    });
    
    it('addOrder() should return an error if one or more products are not found', async () => {
        try {
            await ordersController.addOrder(mockCreateOrderDto);
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error.status).toBe(HttpStatus.NOT_FOUND);
            expect(error.message).toBe('One or more products not found');
        }
    });
})