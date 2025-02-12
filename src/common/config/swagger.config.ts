import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Financial Tracker API')
  .setDescription('Financial Tracker API Descriptions')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
