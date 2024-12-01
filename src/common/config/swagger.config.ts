import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Template API')
  .setDescription('Template API Descriptions')
  .setVersion('1.0')
  .build();
