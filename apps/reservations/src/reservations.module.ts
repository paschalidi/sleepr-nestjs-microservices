import {Module} from '@nestjs/common';
import {ReservationsService} from './reservations.service';
import {ReservationsController} from './reservations.controller';
import {AUTH_SERVICE, DatabaseModule, HealthModule, LoggerModule, PAYMENTS_SERVICE} from "@app/common";
import {ReservationsRepository} from "./reservations.repository";
import {ReservationDocument, ReservationSchema} from "./models/reservation.schema";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        DatabaseModule,
        // here we can define multiple schemas. We give them a name and the schemas
        // this way mongoose can create its structure.
        DatabaseModule.forFeature([{name: ReservationDocument.name, schema: ReservationSchema}]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                HTTP_PORT: Joi.number().required(),
                AUTH_SERVICE_HOST: Joi.string().required(),
                AUTH_SERVICE_PORT: Joi.number().required(),
                PAYMENTS_SERVICE_HOST: Joi.string().required(),
                PAYMENTS_SERVICE_PORT: Joi.number().required(),
            })
        }),
        // we define here that the auth service which we use in this module is provided here
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('AUTH_SERVICE_HOST'),
                        port: configService.get('AUTH_SERVICE_PORT'),
                    }
                }),
                inject: [ConfigService]
            },
            {
                name: PAYMENTS_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('PAYMENTS_SERVICE_HOST'),
                        port: configService.get('PAYMENTS_SERVICE_PORT'),
                    }
                }),
                inject: [ConfigService]
            }
        ]),
        HealthModule
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository]
})
export class ReservationsModule {
}
