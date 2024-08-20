import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { Repository } from "typeorm";
import { createProductDto } from "./dto/createProduct.dto";
import { Category } from "../categories/category.entity";
import * as path from 'path';


@Injectable()
export class ProductsDbService implements OnModuleInit{
    constructor(
        @InjectRepository(Product)
        private productDbRepository:Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository:Repository<Category>
    ) {}
    async onModuleInit() {
        try {
            await this.seedProducts();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: 'No se pudieron cargar los seeders'})
        }
    }

    async createProduct(createProductDto: createProductDto): Promise<Product> {
        const { name, description, price, stock, imgUrl, category_id } = createProductDto;
        const category = await this.categoriesRepository.findOne({
            where: {id: category_id}
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const sameProduct = await this.productDbRepository.findOne({where:{name}});
        if (sameProduct) {
            throw new BadRequestException(`El producto con el nombre ${name} ya existe`);
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

    async getProducts(page:number, limit: number): Promise<Product[]> {
        const startIndex:number = (page - 1) * limit;
        const endIndex:number = page * limit;

        const response = await this.productDbRepository.find({ relations: ['category_id'] });

        return response.slice(startIndex, endIndex)
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
        const product: Product = await this.getProductById(id);

        Object.assign(product, updateProductDto);

        return this.productDbRepository.save(product);
    }

    async deleteProduct(id: string): Promise<string> {
        const result = await this.productDbRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Product not found');
        }
        return 'Product correctly removed from datebase'
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
            
            let category = await this.categoriesRepository.findOne({where: { name }});
            let productName = await this.productDbRepository.findOne({where:{name: productData.name}});            

            if (category && !productName) {
                const product = this.productDbRepository.create({
                    ...productData,
                    category_id: category,
                });
                await this.productDbRepository.save(product);
            }
        }
    }
}