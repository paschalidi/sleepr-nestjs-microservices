import {NestFactory} from '@nestjs/core';
import {PaymentsModule} from './payments.module';
import {ConfigService} from "@nestjs/config";
import {Transport} from "@nestjs/microservices";
import {Logger} from "nestjs-pino";

/*
 this is a plain microservice so there wont be http connection to it
 only out internal microservcies can communicate with it via TCP
 */
async function bootstrap() {
    const app = await NestFactory.create(PaymentsModule,)
    const configService = app.get(ConfigService)
    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: configService.get('TCP_PORT')
        }
    })
    app.useLogger(app.get(Logger))
    await app.startAllMicroservices()
}

bootstrap();
