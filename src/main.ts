import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { Config } from "./config";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth({ type: "http" }, "access-token")
    .setTitle("Fuel Allocation App")
    .setDescription("apis")
    .setVersion("1.0")
    .build();

  app.setGlobalPrefix("v1");

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("documentation", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(Config.PORT || 4500);
}
bootstrap();
