import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { QuotesModule } from "./quotes/quote.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import path, { join } from "path";
import nunjucks from "nunjucks";

const PROJECT_ROOT = path.resolve(process.cwd());
const viewsPath = join(PROJECT_ROOT, "views");

@Module({
  imports: [QuotesModule],
})
class AppModule {}

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(PROJECT_ROOT, "views"));
  nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== "production",
  });
  app.setViewEngine("njk");

  await app.listen(3000);
  console.log(`Server is running on port ${await app.getUrl()}`);
}

bootstrap();
