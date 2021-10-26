import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HTTPExceptionFilter } from './commun/filters/http-exception-filter.filter';
import { TransformResponseInterceptor } from './core/http/transform-response.interceptor';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HTTPExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },{
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ],
})
export class AppModule { }
