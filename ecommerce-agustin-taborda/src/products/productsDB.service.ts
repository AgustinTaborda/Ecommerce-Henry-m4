import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { Repository } from "typeorm";
import { createProductDto } from "./dto/createProduct.dto";
import { Category } from "src/categories/category.entity";
import * as path from 'path';


@Injectable()
export class ProductsDbService {
    constructor(
        @InjectRepository(Product)
        private productDbRepository:Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository:Repository<Category>
    ) {}

    async createProduct(createProductDto: createProductDto): Promise<Product> {
        const { name, description, price, stock, imgUrl, category_id } = createProductDto;
        const category = await this.categoriesRepository.findOne({
            where: {id: category_id}
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const product = this.productDbRepository.create({
            name,
            description,
            price,
            stock,
            imgUrl,
            category_id: category,
        });

        return this.productDbRepository.save(product)
    }

    async getProducts(): Promise<Product[]> {
        return this.productDbRepository.find({ relations: ['category_id'] });
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productDbRepository.findOne({
            where: {id},
            relations: ['category_id']
        })
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateProduct(id: string, updateProductDto: Partial<createProductDto>): Promise<Product> {
        const product = await this.getProductById(id);
        Object.assign(product, updateProductDto);
        return this.productDbRepository.save(product);
    }

    async deleteProduct(id: string): Promise<void> {
        const result = await this.productDbRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Product not found');
        }
    }

    async seedProducts(): Promise<void> {
        const dataFilePath = path.join(__dirname, '..', '..', 'helpers', 'archivo.js');
        const data = require(dataFilePath);

        const categories = new Set(data.map((item: any) => item.category));
        
        for (const categoryName of categories) {
            const name:string = categoryName as string;
            
            let category = await this.categoriesRepository.findOne( {where: { name }});
            if (!category) {
                category = this.categoriesRepository.create({ name });
                await this.categoriesRepository.save(category);
            }
        }

        for (const productData of data) {
            const name:string = productData.category as string;
            console.log(name);
            
            let category = await this.categoriesRepository.findOne({where: { name }});
            console.log(category);
            
            if (category) {
                const product = this.productDbRepository.create({
                    ...productData,
                    category_id: category,
                });
                await this.productDbRepository.save(product);
            }
        }
    }
}