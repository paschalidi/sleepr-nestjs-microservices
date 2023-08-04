import {NestFactory} from '@nestjs/core';
import {ReservationsModule} from './reservations.module';
import {ValidationPipe} from "@nestjs/common";
import {Logger} from "nestjs-pino";
import {ConfigService} from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(ReservationsModule);
    //whitelist: true strips off all incoming data that are not having decorators in the DTO
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({whitelist: true}))
    app.useLogger(app.get(Logger))
    const configService = app.get(ConfigService)
    console.log(configService.get('HTTP_PORT'))
    await app.listen(configService.get('HTTP_PORT'));
}

bootstrap();
