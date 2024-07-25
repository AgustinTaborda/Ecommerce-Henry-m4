import { Injectable, NotFoundException } from "@nestjs/common";
import {User as UserEntity} from './entities/users.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUserDto";
import { classToPlain } from "class-transformer";

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

    async createUser(createDto: createUserDto): Promise<Partial<UserEntity>> {
        const newUser = this.usersDBRepository.create(createDto);
        const repsonse = this.usersDBRepository.save(newUser);
        return classToPlain(repsonse)
    }

    async updateUser(id: string, updateDto: Omit<UserEntity, 'id'>): Promise<UserEntity> {
        const user = await this.getUserById(id); 

        Object.assign(user, updateDto);
        return this.usersDBRepository.save(user);
    }

    async deleteUser(uuid: string): Promise<void> {
        const user: UserEntity = await this.usersDBRepository.findOne({where:{id:uuid}}) 

        await this.usersDBRepository.remove(user);
    }
}