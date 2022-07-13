import {IsDefined, IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsDefined()
    @MinLength(3)
    @MaxLength(25)
    nickname: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}
