import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const db_name = this.config.get("DATABASE_NAME");

    const uri = `mongodb://127.0.0.1:27017/${db_name}`

    return {
      uri,
      // NOTE: we can other options as well, below are the some options you can set
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    };
  }
}