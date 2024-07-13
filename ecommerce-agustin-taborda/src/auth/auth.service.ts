import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    GetAllAuth() {
        return 'all auth'
    }
}