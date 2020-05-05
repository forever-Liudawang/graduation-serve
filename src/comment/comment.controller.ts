import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Comment } from '@app/db/models/comment.model';
export class CommentDto {
    @ApiProperty({description: '留言'})
    commentInfo: String;

    @ApiProperty({description: '用户名'})
    userName: String;
}
// tslint:disable-next-line: max-classes-per-file
export class NameDto {
    @ApiProperty({description: '留言名'})
    name: String;
}
// tslint:disable-next-line: max-classes-per-file
@Controller('comment')
export class CommentController {
    constructor(
        @InjectModel(Comment) private  readonly  commentModel: ModelType <Comment>,
    ) { }

    @Post('/')
    @ApiOperation({summary: '留言'})
    async index(@Body() body: CommentDto) {
        if (Object.keys(body).length == 0) {
            return this.commentModel.find().sort({_id: -1});
        }
        await this.commentModel.create(body);
        return this.commentModel.find().sort({_id: -1});
    }

    @Post('/searchComment')
    @ApiOperation({summary: '搜索留言'})
    async findComment(@Body() body: NameDto ) {
       if (body && body.name) {
           const userName=body.name;
       return this.commentModel.find({ 'userName' : /userName/});
       } else if(body.name == ""){
           return this.commentModel.find();
       }
    }

}
