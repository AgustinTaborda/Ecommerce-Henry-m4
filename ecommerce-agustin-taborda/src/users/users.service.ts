import { Injectable, NotFoundException } from "@nestjs/common";
// import { UsersRepository } from "./users.repository";
// import { User } from "./users.interface";
import {User as UserEntity} from './entities/users.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{
    constructor (
        // private readonly usersRepository:UsersRepository,
        @InjectRepository(UserEntity) 
        private usersDBRepository:Repository<UserEntity>
    ){}
    
    async getUsers(): Promise<UserEntity[]> {
        return this.usersDBRepository.find({
            relations: ['orders_id']
        });
    }

    async getUserById(id: string): Promise<UserEntity> {
        const user:UserEntity = await this.usersDBRepository.findOne({where:{id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async createUser(createDto: Omit<UserEntity, "id">): Promise<UserEntity> {
        const newUser = this.usersDBRepository.create(createDto);
        return this.usersDBRepository.save(newUser);
    }

    async updateUser(id: string, updateDto: Omit<UserEntity, 'id'>): Promise<UserEntity> {
        const user = await this.getUserById(id); 

        Object.assign(user, updateDto);
        return this.usersDBRepository.save(user);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id); 

        await this.usersDBRepository.remove(user);
    }
}