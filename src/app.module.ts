import {Module} from '@nestjs/common';
import {DatabaseModule} from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import {CategoryModule} from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { QuestionModule } from './question/question.module';
import * as Joi from '@hapi/joi';


@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                SESSION_SECRET: Joi.string().required(),
            })
        }), CategoryModule, DatabaseModule, UserModule, AuthenticationModule, QuestionModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
