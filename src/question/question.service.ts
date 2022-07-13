import {HttpException, HttpStatus, Injectable, Req} from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Question} from "./entities/question.entity";
import {CreateCategoryDto} from "../category/dto/create-category.dto";
import {UpdateCategoryDto} from "../category/dto/update-category.dto";
import {CreateQuestionDto} from "./dto/create-question.dto";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>
  ) {
  }

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.questionsRepository.save(createQuestionDto);
  }

  async findAll() {
    return await this.questionsRepository.find();
  }

  async findOne(id: number) {
    const question = await this.questionsRepository.findOneBy({id});
    if (question) {
      return question;
    }
    throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionsRepository.update(id, updateQuestionDto);
    const updatedQuestion = await this.questionsRepository.findOneBy({id});
    if (updatedQuestion) {
      return updatedQuestion;
    }
    throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deleteResponse = await this.questionsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
    }
  }
}
