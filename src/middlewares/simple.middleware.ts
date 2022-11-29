import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SimpleMiddleware implements NestMiddleware {
    constructor() { }

    use(req: Request, res: Response, next: NextFunction) {

        console.log("Simple middleware is working ");

        next();
    }
}


/*
// functional middleware
// we can use both class and functional types of middleware
export function SimpleMiddleware(req: Request, res: Response, next: NextFunction) 
{
    console.log("Simple middleware is working");
    next();
}

*/