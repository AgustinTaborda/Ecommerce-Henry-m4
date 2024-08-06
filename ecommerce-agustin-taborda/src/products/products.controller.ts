import { Controller, Get, Param, Post, Delete, HttpCode, Body, Put, Query, UseGuards, HttpStatus, ParseUUIDPipe } from "@nestjs/common";
import { Product as ProductEntity } from "./entity/product.entity";
import { AuthGuard } from "src/auth/authGuard";
import { ProductsDbService } from "./productsDB.service";
import { createProductDto } from "./dto/createProduct.dto";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";

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
    async createProduct(@Body() createDto:createProductDto) {
        return this.productsDBService.createProduct(createDto)
    }

    @Get()
    async getProducts(
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 5
        ):Promise<ProductEntity[]> {
        return this.productsDBService.getProducts(page, limit)
    }

    @Get(':uuid')
    async getProductById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        return this.productsDBService.getProductById(uuid)
    }
    
    @Put(':uuid')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(
        @Param('uuid', ParseUUIDPipe) uuid:string, 
        @Body() updateProductDto:createProductDto
        ) {
        return this.productsDBService.updateProduct( uuid, updateProductDto )
    }

    @Delete(':uuid')
    // @UseGuards(AuthGuard)
    deleteProduct(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.productsDBService.deleteProduct(uuid)
    }
}