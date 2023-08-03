import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {CurrentUser} from "@app/common/decorators/current-user.decorator";
import {UserDocument} from "@app/common";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UserDocument){
        // the user apparently comes here because of the UseGuards(JwtAuthGuard)
        // there the local auth guard is being executed and the user is being
        // set in the request!
        return user;
    }
}
