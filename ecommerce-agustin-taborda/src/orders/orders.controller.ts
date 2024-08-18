import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { AuthGuard } from "../auth/authGuard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}

    @ApiBearerAuth()
    @ApiBody({
        description: 'Enter userID and products included in this order',
        type: CreateOrderDto
    })
    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.addOrder(createOrderDto)
    }
    
    @ApiBearerAuth()
    @Get(':uuid')
    @UseGuards(AuthGuard)
    async getOrder(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.ordersService.getOrder(uuid)
    }
}