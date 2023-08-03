import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class GetUserUserDto {
    @IsString()
    @IsNotEmpty()
    _id: string
}