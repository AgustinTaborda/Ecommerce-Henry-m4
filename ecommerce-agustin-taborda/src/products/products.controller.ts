import { Controller, Get, Param, Post, Delete, HttpCode, Body, Put, Query, UseGuards, HttpStatus, ParseUUIDPipe } from "@nestjs/common";
import { Product as ProductEntity } from "./entity/product.entity";
import { AuthGuard } from "src/auth/authGuard";
import { ProductsDbService } from "./productsDB.service";
import { createProductDto } from "./dto/createProduct.dto";

@Controller('products')
export class ProductsController{
    constructor(
        private productsDBService: ProductsDbService
    ){}

    @Post('seeder')
    @HttpCode(HttpStatus.CREATED)
    async seedProducts() {
        return this.productsDBService.seedProducts();
    }
    
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseGuards(AuthGuard)
    async createUser(@Body() createDto:createProductDto) {
        return this.productsDBService.createProduct(createDto)
    }

    @Get()
    async getProducts(
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 5
        ):Promise<ProductEntity[]> {
            console.log(page);
            console.log(limit);
            
        return this.productsDBService.getProducts(page, limit)
    }

    @Get(':uuid')
    async getUserById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        return this.productsDBService.getProductById(uuid)
    }
    
    @Put(':uuid')
    @UseGuards(AuthGuard)
    async updateUser(
        @Param('uuid', ParseUUIDPipe) uuid:string, 
        @Body() updateProductDto:createProductDto) {
        return this.productsDBService.updateProduct( uuid, updateProductDto )
    }

    @Delete(':uuid')
    @UseGuards(AuthGuard)
    deleteUser(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.productsDBService.deleteProduct(uuid)
    }
}