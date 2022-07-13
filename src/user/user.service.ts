import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>) {
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({email})
    if (user) {
      return user;
    }
    throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({id})
    if (user) {
      return user;
    }
    throw new HttpException("User with this id does not exist", HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    return await this.usersRepository.save(userData)
  }
}


