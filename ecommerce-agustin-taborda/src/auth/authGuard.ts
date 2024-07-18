import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(
            context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const [authType, authValue] = authHeader.split(' ');

        if (authType !== 'Basic' || !authValue) {
            throw new UnauthorizedException('Invalid authorization format');
        }

        const decodedValue = Buffer.from(authValue, 'base64').toString("utf-8");
        const [email, password] = decodedValue.split(':');

        if (!email || !password) {
            throw new UnauthorizedException('Authorization header must contain email and password');
        };

        request.user = { email, password };
        return true
    }

}