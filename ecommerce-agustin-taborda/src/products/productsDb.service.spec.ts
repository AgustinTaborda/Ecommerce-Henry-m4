import { Test, TestingModule } from "@nestjs/testing"
import { ProductsController } from "./products.controller"
import { Repository } from "typeorm";
import { Category } from "../categories/category.entity";
import { Product } from "./entity/product.entity";
import { JwtService } from "@nestjs/jwt";
import { ProductsDbService } from "./productsDB.service";
import { createProductDto } from "./dto/createProduct.dto";
import { addCategoryDto } from "../categories/dto/addCategory.dto";
import e from "express";
import { HttpStatus } from "@nestjs/common";

describe('ProductsService', () => {
    let productsDbService:ProductsDbService;
    let mockCategoryRepository: Partial<Repository<Category>>;
    let mockProductsRepository: Partial<Repository<Product>>;
    let mockJwtService: Partial<JwtService>;

    const mockCreateProductDto: createProductDto = {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        stock: 10,
        category_id: "c891c0ac-1256-423d-b412-12315023c766"
    };

    const mockCategory: Category = {
        id: "c891c0ac-1256-423d-b412-12315023c766",
        name: "smartphone",
        products_id: []
    };

    let mockProduct = new Product;

    beforeEach( async () => {
        mockCategoryRepository = {
            findOne: jest.fn().mockResolvedValue(mockCategory)
        };

        mockProductsRepository = {
            find: jest.fn().mockResolvedValue([mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct]),
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(mockCreateProductDto),
            create: jest.fn().mockResolvedValue(new Product),
        };

        mockJwtService = {};

        const module: TestingModule = await Test.createTestingModule({
            providers:[
                ProductsDbService,
                {
                    provide: "CategoryRepository",
                    useValue: mockCategoryRepository
                }, {
                    provide: "ProductRepository",
                    useValue: mockProductsRepository
                }, {
                    provide: JwtService,
                    useValue: mockJwtService
                }
            ],
            controllers: [ProductsController]
        }).compile();

        productsDbService = module.get<ProductsDbService>(ProductsDbService);
    });

    it('should create an instance of ProductsDbServices', async () => {
        console.log(productsDbService);
        
        expect(productsDbService).toBeDefined();
    });
    
    it('createProduct() should return a new Product', async () => {
        const response = await productsDbService.createProduct(mockCreateProductDto);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Object);
    });
    
    it('createProduct() should return an error if the new Product has a wrong category', async () => {
        jest.spyOn(mockCategoryRepository, 'findOne').mockResolvedValue(null);

        try {
            await productsDbService.createProduct(mockCreateProductDto);
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error.status).toBe(HttpStatus.NOT_FOUND);
            expect(error.response.message).toBe('Category not found');
        }
    });
    
    it('createProduct() should return an error if the new Product has the same name than other one alredy in the database', async () => {
        jest.spyOn(mockProductsRepository, 'findOne').mockResolvedValue(mockProduct);

        try {
            await productsDbService.createProduct(mockCreateProductDto);
        } catch (error) {
            console.log(error);
            expect(error).toBeDefined();
            expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });
    
    it('getProducts() should return an array of products', async () => {
        const response = await productsDbService.getProducts(1,5);

        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBe(5);
    });

})