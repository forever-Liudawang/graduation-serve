import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();  // 解决跨域问题

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();  // 解决跨域问题

  
  app.useStaticAssets('uploads', {    //静态文件托管
    prefix: '/uploads',
  });


  const options = new DocumentBuilder()
  .setTitle('后台管理')
  .setDescription('服务端API')
  .setVersion('1.0')
  .addTag('api-docs')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
