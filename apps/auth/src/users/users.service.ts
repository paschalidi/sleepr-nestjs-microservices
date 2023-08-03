import {BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersRepository} from "./users.repository";
import {ValidateUserDto} from "./dto/validate-user.dto";
import * as bcrypt from 'bcryptjs';
import {GetUserUserDto} from "./dto/get-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
    }

    private async validateWhetherEmailAlreadyExists(email: string) {
        try {
            await this.usersRepository.findOne({email})
        } catch (e) {
            return
        }
        // if there is no error means we found a user with this email
        throw new UnprocessableEntityException('Email already exists')

    }

    async create(createUserDto: CreateUserDto) {
        await this.validateWhetherEmailAlreadyExists(createUserDto.email);

        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }

    async verifyUser({email, password}: ValidateUserDto) {
        const user = await this.usersRepository.findOne({email})
        const {password: hashedPassword} = user || {};
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
            throw new UnauthorizedException('credentials are not valid')
        }

        return user;
    }

    async getUser(getUserDto: GetUserUserDto) {
        return this.usersRepository.findOne(getUserDto)
    }
}
