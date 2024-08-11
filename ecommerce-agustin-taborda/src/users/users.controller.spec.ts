import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { AuthGuard } from "../auth/authGuard";
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { JwtService } from "@nestjs/jwt";

describe('UsersController', () => {
    let UsersController:UserController;
    let jwtService:JwtService;
    let mockUsersRepository : Partial<Repository<User>>;

    const mockUser:User = {
        id: "123123",
        name: 'Fabricio',
        password: '123456',
        email: "fabricio@hotmail.com",
        isAdmin: false,
        phone: 71727277,
        country: "Argentina",
        address: "Random adress 123",
        city: "Cordoba",
        orders_id: []
    };

    beforeEach( async () => {
        mockUsersRepository = {
            findOne: () => Promise.resolve(null),
            save: () => Promise.resolve(null),
            find: () => Promise.resolve(null) 
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService, 
                UsersRepository, 
                JwtService,
                AuthGuard,
                {
                    provide: 'UserRepository',
                    useValue: mockUsersRepository
                },
                {
                    provide: 'usersDBRepository',
                    useValue: mockUsersRepository
                },

            ],
            controllers: [UserController]
        }).compile();

        UsersController = module.get<UserController>(UserController);
    });

    it('should create an instance of UsersController', () => {
        expect(UsersController).toBeDefined();
    });

    it('getUsers() should return an array of users', async () => {
        jest.spyOn(mockUsersRepository, 'find').mockResolvedValue([mockUser]);

        const response = await UsersController.getUsers();
        
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBeGreaterThanOrEqual(1);
        expect(response[0]).toEqual(mockUser);
    });

    it('getUserById() should return a user by id', async () => {
        jest.spyOn(UsersService.prototype, 'getUserById').mockResolvedValue(mockUser);
    
        const user = await UsersController.getUserById('valid-uuid');
        expect(user).toEqual(mockUser);
    });
   
    it('getUserById() should not return a user if the id is not valid', async () => {
        jest.spyOn(UsersService.prototype, 'getUserById').mockResolvedValue(null);
        
        try {
            await UsersController.getUserById('not-valid-uuid');
        } catch (error) {
            expect(error.message).toBe('User not found');
        }
    });

    it('deleteUser() should delete a user by id', async () => {
        jest.spyOn(UsersService.prototype, 'deleteUser').mockResolvedValue(undefined);
    
        const result = await UsersController.deleteUser('valid-uuid');        
        expect(result).toBeUndefined();
    });
})