import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDto } from "../users/dto/createUserDto";
import { User } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";

@Injectable()
export class AuthService{
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}
        
    async authSignUp(createUserDto:createUserDto) {
        const user: User = await this.userRepository.findOne({where: {email: createUserDto.email}});
        if (user) {
            throw new BadRequestException('Email already in use')
        }
        
        const hashedPassword:string = await bcrypt.hash(createUserDto.password, 10);            
        if (!hashedPassword) {
            throw new BadRequestException('Password could not be hashed')
        }
        
        const dbUser = await this.userRepository.save({...createUserDto, password: hashedPassword});
        if (!dbUser) {
            throw new BadRequestException('User could not be register correctly')
        }

        const {password, ...DbUserWithoutPassword} = dbUser;
        
        return DbUserWithoutPassword
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