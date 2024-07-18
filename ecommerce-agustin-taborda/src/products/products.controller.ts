import { Controller, Get, Param, Post, Delete, HttpCode, Body, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.interface";
import { AuthGuard } from "src/auth/authGuard";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService:ProductsService){}

    @Get()
    getProducts(@Query('page') page: string = '1', @Query('limit') limit: string = '5') {
        return this.productsService.GetAllProducts(Number(page), Number(limit));
    }

    @Get(':id')
    getUserById(@Param('id') id:string) {        
        return this.productsService.getProductById(id)
    }
    
    @HttpCode(201)
    @Post()
    @UseGuards(AuthGuard)
    createUser(@Body() createDto:Omit<Product, 'id'>) {
        return this.productsService.createProduct(createDto);
    }
    
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id:string, @Body() updateProductDto:Omit<Product, 'id'>) {
        return this.productsService.updateProduct(id, updateProductDto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id:string) {
        return this.productsService.deleteProduct(id)
    }
}