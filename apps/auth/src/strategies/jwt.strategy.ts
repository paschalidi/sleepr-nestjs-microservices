import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";
import {Request} from "express";
import {TokenPayload} from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // this request here can be either from a user or from a microservice
                // in technical terms either from http or rpc
                (request: any) => {
                    return request?.cookies?.Authentication || request?.Authentication
                }]),
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }

    async validate({userId}: TokenPayload) {
        return this.usersService.getUser({_id: userId})
    }
}
