import { BadRequestException, Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./authGuard";
import { Request } from "express";
import { createUserDto } from "src/users/dto/createUserDto";
import { CredentialsDto } from "./dto/credentials.dto";
@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    authSignUp(@Body() createUserDto:createUserDto & {passwordConfirmation:string}) {
        const {password, passwordConfirmation, ...userDtoWithoutPassword} = createUserDto;

        if (password !== passwordConfirmation) {
            throw new BadRequestException('Las contraseñas no coinciden')
        }
        return this.authService.authSignUp({password, ...userDtoWithoutPassword})
    }

    @Post('signin')
    authSignIn(@Body() credentials: CredentialsDto) {        
        const { email, password } = credentials;

        return this.authService.authSignIn(email, password);
    }
}