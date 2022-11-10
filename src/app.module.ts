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
import { User } from './entities/user.entity'
import { UserModule } from './user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';


const is_dev_mode = false;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal:true,
        envFilePath:".env"
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        logging:true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    // ConfigModule.forRoot({isGlobal:true}),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    // MongooseModule.forRootAsync({
    //   imports:[ConfigModule],
    //   useFactory:(ConfigService:ConfigService) => {
    //     const db_name = ConfigService.get("DATABASE_NAME");
    //     const uri = `mongodb://127.0.0.1:27017/${db_name}`;
    //     return { uri };
    //   },
    //   inject:[ConfigService]
    // })
    // MongooseModule.forRootAsync({
    //   useClass:MongooseConfigService
    // })
    UserModule
  ],
  controllers: [],
  // providers: [AppService],
  providers: [
    // UserService,
    {provide:'DB_NAME', useValue:'Demo'},
    {provide:'MAIL',useValue:['nayan@gamil.com','test@gmail.com']},
    {
      provide:'OBJECTDATA', useValue:{
        name:'nayan',
        age:'25'
      }
    },
    {
      provide:Config, useValue:{name:'test here'}
    },
    {
      provide:"EVENT_STORE",
      useFactory:(limit:number) => {
        return is_dev_mode ? 2 : 3;
      },
      inject:[{token:'LIMIT', optional:true}]
    },
    // {
    //   provide:'LIMIT',
    //   useValue:3
    // }
  ],
})
export class AppModule {}
