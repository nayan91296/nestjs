import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { AppService } from './app.service';
import { Config } from './config';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseConfigService } from './mongoose-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerMiddleware } from './middleware/logger.middleware';


const is_dev_mode = false;

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [AppService],
  providers: [
    UserService
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user/get');
  }
}
