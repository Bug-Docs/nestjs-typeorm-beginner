import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { TestException } from "./test.exception";
import { Response } from "express";

@Catch(TestException)
export class TestExceptionFilter implements ExceptionFilter {
    catch(exception: TestException, host: ArgumentsHost) {
        const body = {
            message: exception.message,
            error: "This is test error"
        }

        console.log(host);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(HttpStatus.BAD_REQUEST).json(body);
    }
}