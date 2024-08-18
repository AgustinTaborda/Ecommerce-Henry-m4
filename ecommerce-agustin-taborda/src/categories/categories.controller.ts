import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { addCategoryDto } from "./dto/addCategory.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor (private categoriesService:CategoriesService) {}

    @Post('seeder')
    @HttpCode(HttpStatus.CREATED)
    async seedCategories() {
        return this.categoriesService.seedCategories();
    }
    
    @Get()
    async getCategories() {
        return this.categoriesService.getCategories()
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async addCategories( @Body() category: addCategoryDto) {
        return this.categoriesService.addCategory(category)
    }

    @Put(':id')
    async updateCategory(
        @Body() categoryDto: addCategoryDto,
        @Query('id')  categoryId:string
        ) {
        return this.categoriesService.updateCategory(categoryId, categoryDto)
    }

    @Delete(':id')
    async deleteCategory(@Query('id')  categoryId:string) {
        return this.categoriesService.deleteCategory(categoryId)
    }
}