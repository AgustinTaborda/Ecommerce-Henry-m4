import { Controller, Get, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./authGuard";
import { Request } from "express";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService) {}

    @Post('signin')
    @UseGuards(AuthGuard)
    // authSignin(@Headers('email') email:string, @Headers('password') password:string) {
    authSignin(@Req() req: Request & any) {
        const { email, password } = req.user
        return this.authService.authSignin(email, password);
    }
}