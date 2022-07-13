import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {QuestionService} from './question.service';
import {CreateQuestionDto} from './dto/create-question.dto';
import {UpdateQuestionDto} from './dto/update-question.dto';
import RequestWithUser from "../authentication/requestWithUser.interface";
import {CookieAuthenticationGuard} from "../authentication/cookieAuthentication.guard";
import {Request} from "express";
import RoleGuard from "../authentication/role.guard";
import Role from "../user/entities/role.enum";

@Controller('question')
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  @Post()
  @UseGuards(CookieAuthenticationGuard)
  @UseGuards(RoleGuard(Role.Admin))
  create(@Req() request: Request) {
    const {body, user} = request;
    const createQuestionDto: CreateQuestionDto = {...body, user}
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
