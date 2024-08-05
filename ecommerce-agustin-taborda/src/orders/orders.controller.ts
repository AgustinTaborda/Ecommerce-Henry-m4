import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { AuthGuard } from "src/auth/authGuard";

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.addOrder(createOrderDto)
    }
    
    @Get(':uuid')
    @UseGuards(AuthGuard)
    async getOrder(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.ordersService.getOrder(uuid)
    }
}