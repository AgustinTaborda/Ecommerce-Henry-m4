// import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// @Injectable()
// export class loggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: NextFunction) {
//         console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url}`);
//         next();
//     }
// }

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const date:Date = new Date();
    const formattedDate: string = date.toISOString().slice(0, 19).replace('T', ' ');    
    console.log(`Se ha ejecutado un método ${req.method} en la ruta ${req.url} con fecha ${formattedDate}`);
    next();
}
