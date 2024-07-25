import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { addCategoryDto } from "./dto/addCategory.dto";

@Controller('categories')
export class CategoriesController {
    constructor (private categoriesService:CategoriesService) {}

    @Post('seeder')
    @HttpCode(HttpStatus.CREATED)
    async seedCategories() {
        return this.categoriesService.seedCategories();
    }
    
    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    addCategories( @Body() category:addCategoryDto) {
        return this.categoriesService.addCategory(category)
    }
}