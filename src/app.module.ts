import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {LoginController} from './login/login.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DbModule } from '@app/db';
import { CommentModule } from './comment/comment.module';
import {CommentController} from './comment/comment.controller';
import { EventsGateway } from './events.gateway';
import { MulterModule } from '@nestjs/platform-express';
import { UserInfoController } from './user-info/user-info.controller';
import { UserInfoModule } from './user-info/user-info.module';

@Module({
  imports: [
    MulterModule.register({   //配置图片的存放地址
      dest: 'uploads',
      //   storage: MAO({      //云存储
      //     config: {
      //         region: '<region>',
      //         accessKeyId: '<accessKeyId>',
      //         accessKeySecret: '<accessKeySecret>',
      //         bucket: '<bucket>',
      //     },
      // }),
    }),
    DbModule,   //必须导入数据库模块
    LoginModule,
    CommentModule,
    UserInfoModule,
  ],
  controllers: [AppController, LoginController, CommentController, UserInfoController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
