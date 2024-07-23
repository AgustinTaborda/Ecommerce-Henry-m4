import { Controller, Get, Param, Post, Delete, HttpCode, Body, Put, Query, UseGuards, HttpStatus } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.interface";
import { Product as ProductEntity } from "./entity/product.entity";
import { AuthGuard } from "src/auth/authGuard";
import { ProductsDbService } from "./productsDB.service";
import { createProductDto } from "./dto/createProduct.dto";

@Controller('products')
export class ProductsController{
    constructor(
        private readonly productsService:ProductsService,
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
    createUser(@Body() createDto:createProductDto) {
        return this.productsDBService.createProduct(createDto)
    }

    @Get()
    getProducts(
        @Query('page') page: string = '1', 
        @Query('limit') limit: string = '5'):Promise<ProductEntity[]> {
        return this.productsDBService.getProducts()
        // return this.productsService.GetAllProducts(Number(page), Number(limit));
    }

    @Get(':id')
    getUserById(@Param('id') id:string) {        
        return this.productsDBService.getProductById(id)
    }
    
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(
        @Param('id') id:string, 
        @Body() updateProductDto:createProductDto) {
        // return this.productsService.updateProduct(id, updateProductDto)
        return this.productsDBService.updateProduct( id, updateProductDto )
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id:string) {
        // return this.productsService.deleteProduct(id)
        return this.productsDBService.deleteProduct(id)
    }
}