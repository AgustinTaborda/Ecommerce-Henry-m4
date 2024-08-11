import { AuthService } from "./auth.service"
import { User } from "../users/entities/users.entity";
import * as jwt from 'jsonwebtoken'
import { createUserDto } from "../users/dto/createUserDto";
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let authService:AuthService;
    let userRepository: Repository<User>;
    let jwtService: JwtService;

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
    const mockCreateUserDto:createUserDto= {
        name: 'Fabricio',
        password: '123456',
        email: "fabricio@hotmail.com",
        phone: 71727277,
        country: "Argentina",
        address: "Random adress 123",
        city: "Cordoba",
    };

    const mockJwtService = {
        sign: (payload) => jwt.sign(payload, 'testSecret')
    };

    let mockUsersRepository : Partial<Repository<User>>
    
    beforeEach( async () => {
        mockUsersRepository = {
            findOne: () => Promise.resolve(undefined),
            save: () => Promise.resolve(undefined) 
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersRepository,
                {
                    provide: JwtService,
                    useValue: mockJwtService
                }, 
                {
                    provide: "UserRepository",
                    useValue: mockUsersRepository
                }
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);   
        userRepository = module.get<Repository<User>>('UserRepository');
        jwtService = module.get<JwtService>(JwtService);
    });

    it('Create an instance of AuthService', () => {        
        expect(authService).toBeDefined();
    });

    it('authSignUp should throw an error if the email is already in use', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser); 

        try {
            await authService.authSignUp(mockCreateUserDto);
        } catch (error) {
            expect(error.message).toEqual('Email already in use')
        }
    });


    it('authSignUp should successfully register a new user with valid data', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined); 
        jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser); 

        const response = await authService.authSignUp(mockCreateUserDto);        
        expect(response).toBeDefined();        
        expect(response).toBeInstanceOf(Object);        
    });

    it('signIn() throw an error if the password is invalid', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
        const email:string = mockUser.email;
        const password:string = 'invalid-password';
        
        try {
            await authService.authSignIn(email, password);
        } catch (error) {
            expect(error.message).toEqual('Email or password incorrect');
        }
    });
    
    it('signIn() throw an error if the email is invalid', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
        const email:string = 'invalid-email';
        const password:string = mockUser.password;
        
        try {
            await authService.authSignIn(email, password);
        } catch (error) {
            expect(error.message).toEqual('Email or password incorrect');
        }
    });

    it('authSignIn should authenticate a user with correct credentials', async () => {
        const mockUserVariant = {
            ...mockUser,
            password: await bcrypt.hash(mockUser.password, 10)
        };

        jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUserVariant);

        const response = await authService.authSignIn(mockUser.email, mockUser.password);    

        expect(response.success).toBeDefined();
        expect(response.token).toBeDefined();
        expect(response.success).toEqual('User logged in succesfully');
    });
})