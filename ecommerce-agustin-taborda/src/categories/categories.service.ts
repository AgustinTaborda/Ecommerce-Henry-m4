import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { addCategoryDto } from "./dto/addCategory.dto";
import * as path from 'path'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) 
        private categoriesRepository: Repository<Category>
        ) {}
        
        async getCategories(): Promise<Category[]> {
            return this.categoriesRepository.find()
        }

        async addCategory(addCategoryDto: addCategoryDto): Promise<Category> {
            const existingCategory = await this.categoriesRepository.findOne({
                where: { name: addCategoryDto.name }
            });
            
            if (existingCategory) {
                throw new ConflictException('Category name already exists');
            }
            
            return this.categoriesRepository.save(addCategoryDto)
        }
        
        async seedCategories(): Promise<void> {
            const dataFilePath = path.join(__dirname, '..', '..', 'helpers', 'archivo.js');
            const data = require(dataFilePath);

            const categories = new Set(data.map((item: any) => item.category));
            
            for (const categoryName of categories) {
                let name:string = categoryName as string;
                let category = await this.categoriesRepository.findOne({where: { name }});
                
                if (!category) {
                    category = this.categoriesRepository.create({ name });
                    await this.categoriesRepository.save(category);
                }
            }
        }
}