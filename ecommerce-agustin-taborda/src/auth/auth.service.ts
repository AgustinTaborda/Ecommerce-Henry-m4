import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
// import { UsersRepository } from "src/users/users.repository";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>
        ) {}

   async authSignin(email:string, password:string) {
        const user: User = await this.userRepository.findOne({where: {email}})

        // (user.password === password) ? 'Authorization pass' : 'Authorization fail'
        if (user.password === password) {
            return 'Authorization pass' 
        } 
        throw new UnauthorizedException('Email or password incorrect')
    }
}