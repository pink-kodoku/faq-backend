import {IsDefined, IsString} from "class-validator";
import {User} from "../../user/entities/user.entity";

export class CreateQuestionDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsDefined()
  user: User;
}
