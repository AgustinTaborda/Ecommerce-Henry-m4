import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "../users/dto/createUserDto";
import { User } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService{
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        // crear userrepository para resolver todo este embrollo, por ahora voy a usar el service
        private readonly usersService:UsersService,
        private readonly jwtService: JwtService
    ) {}
        
    async authSignUp(createUserDto:createUserDto) {
        const newUser = await this.usersService.createUser(createUserDto);
        const { password, ...user} = newUser;
        return user;
    }

    async authSignIn(email:string, password:string) {
        const user: User = await this.userRepository.findOne({where: {email}})

        if (!user) {
            throw new UnauthorizedException('Email or password incorrect')
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            throw new UnauthorizedException('Email or password incorrect')
        }

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            role: [user.isAdmin ? Role.Admin : Role.User]
        };        

        const token = this.jwtService.sign(userPayload)

        return {success: 'User logged in succesfully', token}
    }
        
}