import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthService{
    constructor (private readonly userRepository:UsersRepository) {}

    authSignin(email:string, password:string) {
        const users = this.userRepository.getAllUsers();

        const emailCheck = users.find(user => user.email === email);
        if (emailCheck) {
            const passwordCheck = users.find(user => user.password === password);
            if(passwordCheck) {
                return 'Authorization pass'
            } 
            return 'Authorization fail'
        }
        return 'Authorization fail'
    }
}