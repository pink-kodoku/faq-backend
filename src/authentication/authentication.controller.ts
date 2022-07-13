import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor, HttpCode, UseGuards, Req
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {RegisterDataDto} from "./dto/register-data.dto";
import {LogInWithCredentialsGuard} from "./logInWithCredentials.guard";
import RequestWithUser from "./requestWithUser.interface";
import {CookieAuthenticationGuard} from "./cookieAuthentication.guard";

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}


  @Post("register")
  async register(@Body() registrationData: RegisterDataDto) {
    return this.authenticationService.register(registrationData)
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.logOut({keepSessionInfo: false}, () => true);
    request.session.cookie.maxAge = 0;
  }
}
