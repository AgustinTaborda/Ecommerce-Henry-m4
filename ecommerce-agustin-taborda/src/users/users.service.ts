import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {User, User as UserEntity} from './entities/users.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUserDto";
import { classToPlain } from "class-transformer";
import * as bcrypt from 'bcrypt';
import { CreateAdminUserDto } from "./dto/createAdminUser.dto";

@Injectable()
export class UsersService{
    constructor (
        @InjectRepository(UserEntity) 
        private usersDBRepository:Repository<UserEntity>
    ){}
    
    async getUsers(): Promise<Partial<UserEntity>[]> {
        const response = this.usersDBRepository.find({
            relations: ['orders_id']
        });

        return classToPlain(response) as Partial<UserEntity>[];
    }

    async getUserById(id: string): Promise<Partial<UserEntity>> {
        const user:UserEntity = await this.usersDBRepository.findOne({where:{id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return classToPlain(user);
    }

    async createUser(createDto: createUserDto): Promise<UserEntity> {
        const user: User = await this.usersDBRepository.findOne({where: {email: createDto.email}});
        if (user) {
            throw new BadRequestException('Email already in use')
        }
        
        const hashedPassword:string = await bcrypt.hash(createDto.password, 10);            
        if (!hashedPassword) {
            throw new BadRequestException('Password could not be hashed')
        }
        
        const dbUser = await this.usersDBRepository.save({...createDto, password: hashedPassword});
        if (!dbUser) {
            throw new BadRequestException('User could not be register correctly');
        }
        
        return dbUser
    }
    
    async createAdminUser(createAdminDto: CreateAdminUserDto): Promise<UserEntity> {
        const user: User = await this.usersDBRepository.findOne({where: {email: createAdminDto.email}});
        if (user) {
            throw new BadRequestException('Email already in use')
        }
        
        const hashedPassword:string = await bcrypt.hash(createAdminDto.password, 10);            
        if (!hashedPassword) {
            throw new BadRequestException('Password could not be hashed')
        }
        
        const dbUser = await this.usersDBRepository.save({...createAdminDto, password: hashedPassword});
        if (!dbUser) {
            throw new BadRequestException('User could not be register correctly');
        }
        
        return dbUser
    }

    async updateUser(id: string, updateDto: createUserDto): Promise<UserEntity> {
        const user = await this.getUserById(id); 
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password, ...userWithoutPassword } = updateDto;

        let hashedPassword: string;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = {password: hashedPassword, ...userWithoutPassword}
        
        Object.assign(user, updatedUser);
        return await this.usersDBRepository.save(user);
    }

    async deleteUser(uuid: string): Promise<string> {
        const user: UserEntity = await this.usersDBRepository.findOne({where:{id:uuid}}) 
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const result = await this.usersDBRepository.delete(user);
        if (result.affected === 1) {
            return `User ${uuid} was removed from the database`
        }
    }
}