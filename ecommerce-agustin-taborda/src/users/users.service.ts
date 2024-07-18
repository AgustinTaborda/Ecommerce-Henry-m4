import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.interface";

@Injectable()
export class UsersService{
    constructor (private readonly usersRepository:UsersRepository){}
    
    getUsers() {
        return this.usersRepository.getUsers();
    }
    
    getUserById(id:string) {
        return this.usersRepository.getUserById(id);
    }
    
    createUser(createDto: Omit<User, "id">) {
        return this.usersRepository.createUser(createDto)
    }
    
    updateUser(id: string, updateDto:Omit<User, 'id'>) {
        return this.usersRepository.updateUser(id, updateDto);
    }
    
    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id);
    }
}