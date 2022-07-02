import {Module} from '@nestjs/common';
import {DatabaseModule} from './database/database.module';
import {ConfigModule} from "@nestjs/config";
import {CategoryModule} from './category/category.module';
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
                PORT: Joi.number(),
            })
        }), CategoryModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
