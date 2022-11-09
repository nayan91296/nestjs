import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { AppService } from './app.service';
import { Config } from './config';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseConfigService } from './mongoose-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'


const is_dev_mode = false;

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [AppService],
  providers: [
    UserService
  ],
})
export class UserModule {}
