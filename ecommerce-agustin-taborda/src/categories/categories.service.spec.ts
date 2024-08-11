import { Test } from "@nestjs/testing";
import { CategoriesService } from "./categories.service"
import { CategoriesController } from "./categories.controller";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { addCategoryDto } from "./dto/addCategory.dto";
import { HttpStatus } from "@nestjs/common";

describe('CategoriesService', () => {
    let categoriesService:CategoriesService;

    let mockCategoriesRepository:Partial<Repository<Category>>;

    let mockCategory: Category = {
        id: "c891c0ac-1256-423d-b412-12315023c766",
        name: "smartphone",
        products_id: []
    };

    let mockCategoryDto: addCategoryDto = {
        name: "newCategory",
    };

    beforeEach( async () => {
        mockCategoriesRepository = {
            find: () => null,
            findOne: () => null,
            save: () => null,
        };

        const module = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {   
                    provide: "CategoryRepository",
                    useValue: mockCategoriesRepository
                }
            ],
            controllers: [CategoriesController]
        }).compile();

        categoriesService = module.get<CategoriesService>(CategoriesService)
    });

    it('create an instance of CategoriesService', async () => {
        expect(categoriesService).toBeDefined();
    });

    it('getCategories() should return an array of categories', async () => {
        jest.spyOn(mockCategoriesRepository, 'find').mockResolvedValue([mockCategory])

        const response = await categoriesService.getCategories();
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThanOrEqual(1);

        const category = response[0];
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('products_id');
    });

    it('addCategories() should add correctly a new category and return it', async () => { 
        jest.spyOn(mockCategoriesRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(mockCategoriesRepository, 'save').mockResolvedValue(mockCategory);

        const response = await categoriesService.addCategory(mockCategoryDto);
        
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Object);
    });
    
    it('addCategories() should return an error if the category name already exists', async () => { 
        jest.spyOn(mockCategoriesRepository, 'findOne').mockResolvedValue(mockCategory);

        try {
            await categoriesService.addCategory(mockCategoryDto);
        } catch (error) {
            expect(error.status).toBe(HttpStatus.CONFLICT);
            expect(error.response.message).toBe('Category name already exists');
        }
    });
})