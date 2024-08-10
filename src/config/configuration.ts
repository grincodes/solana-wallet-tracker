import { Logger } from "@nestjs/common";
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  validateSync,
} from "class-validator";

import { config } from "dotenv";
config();

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsBoolean()
  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === "true";

  @IsString()
  readonly DATABASE_HOST = process.env.DATABASE_HOST as string;

  @IsInt()
  readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

  @IsString()
  readonly DATABASE_NAME = process.env.DATABASE_NAME as string;

  @IsString()
  readonly DATABASE_USER = process.env.DATABASE_USER as string;

  @IsString()
  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

  @IsString()
  readonly BOT_TOKEN = process.env.BOT_TOKEN as string;

  @IsString()
  readonly CHAT_ID = process.env.CHAT_ID as string;

  @IsBoolean()
  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === "true";

  @IsString()
  readonly PORT = process.env.PORT;

  @IsString()
  readonly NODE_ENV = process.env.NODE_ENV;

  constructor() {
    const error = validateSync(this);

    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error[0])}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
