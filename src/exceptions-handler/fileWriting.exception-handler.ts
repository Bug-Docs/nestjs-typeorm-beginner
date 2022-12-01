import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";;
import { Request, Response } from "express";
import { writeFile } from "fs/promises";
import { join } from "path";

@Catch()
export class FileWritingExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
 
        const body = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
            path: request.url
        }

        this.writeHttpLog(body);

        response.status(status).json(body);
    }

    private async writeHttpLog(data: Record<string, any>) {
        const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);
        try {
            await writeFile(LOGS_DIR, JSON.stringify(data));
        }
        catch (error) {
            return;
        }
    }
}