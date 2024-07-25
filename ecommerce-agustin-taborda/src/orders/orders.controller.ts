import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.addOrder(createOrderDto)
    }
    
    @Get(':uuid')
    async getOrder(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.ordersService.getOrder(uuid)
    }
}