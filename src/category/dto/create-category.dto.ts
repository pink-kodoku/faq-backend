import {IsDefined, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCategoryDto {
    @IsDefined()
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    name: string;
}
