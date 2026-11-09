import { type INestApplication, StandardSchemaValidationPipe } from "@nestjs/common";

export function setupApp(app: INestApplication) {
	app.setGlobalPrefix("api");
	app.useGlobalPipes(new StandardSchemaValidationPipe());
}
