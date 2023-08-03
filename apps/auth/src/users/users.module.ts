import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {DatabaseModule, LoggerModule} from "@app/common";
import {UserDocument, UserSchema} from "@app/common";
import {UsersRepository} from "./users.repository";

@Module({
    imports: [
        DatabaseModule,
        // here we can define multiple schemas. We give them a name and the schemas
        // this way mongoose can create its structure.
        DatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}]),
        LoggerModule
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService]
})
export class UsersModule {


}
