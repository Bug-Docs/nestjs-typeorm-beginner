import { ArgumentsHost, ExceptionFilter, HttpStatus, HttpException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { writeFile } from "fs/promises";
import { join } from "path";

export class GlobalExceptionFilter implements ExceptionFilter {

    constructor(private httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal Server Error";

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        const { httpAdapter } = this.httpAdapterHost;

        const body = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message
        };

        this.writeHttpLog(body);

        httpAdapter.reply(ctx.getResponse(), body, status);

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




/**
 * want to register globally in main.ts
 * const hostAdapterHost = app.get(HttpAdapterHost);
 * app.useGlobalFilters(new GlobalExceptionFilter(hostAdapterHost));
 */


/**
 * want to register it globally in app.module.ts
 * put this code in providers
 * { provide: APP_FILTER, useClass: GlobalExceptionFilter }
 */