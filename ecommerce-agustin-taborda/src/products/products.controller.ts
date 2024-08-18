import { Controller, Get, Param, Post, Delete, HttpCode, Body, Put, Query, UseGuards, HttpStatus, ParseUUIDPipe, ParseIntPipe } from "@nestjs/common";
import { Product as ProductEntity } from "./entity/product.entity";
import { AuthGuard } from "../auth/authGuard";
import { ProductsDbService } from "./productsDB.service";
import { createProductDto } from "./dto/createProduct.dto";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
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

    @ApiQuery({ name: 'page', required: false, description: 'Número de la página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de productos por página', example: 5})
    @Get()
    async getProducts(
        @Query('page', ParseIntPipe) page: number = 1, 
        @Query('limit', ParseIntPipe) limit: number = 5
        ):Promise<ProductEntity[]> {
        return this.productsDBService.getProducts(page, limit)
    }

    @Get(':uuid')
    async getProductById(@Param('uuid', ParseUUIDPipe) uuid:string) {        
        return this.productsDBService.getProductById(uuid)
    }
    
    @ApiBearerAuth()
    @Put(':uuid')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(
        @Param('uuid', ParseUUIDPipe) uuid:string, 
        @Body() updateProductDto:createProductDto
        ) {
        return this.productsDBService.updateProduct( uuid, updateProductDto )
    }

    @ApiBearerAuth()
    @Delete(':uuid')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('uuid', ParseUUIDPipe) uuid:string) {
        return this.productsDBService.deleteProduct(uuid)
    }
}