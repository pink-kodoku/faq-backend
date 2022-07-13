import {IsDefined, IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class LoginDataDto {
    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}