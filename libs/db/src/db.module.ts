import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Comment} from './models/comment.model';
import { UserInfo } from './models/userInfo.model';
import { UserInfoComment } from './models/userInfoComment.model';

const models = TypegooseModule.forFeature([User, Comment , UserInfo , UserInfoComment]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/graduation-project', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
