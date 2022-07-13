import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(Number(userId))
    done(null, user);
  }
}