import { Controller, Post, Put, Body, Delete, Get } from '@nestjs/common';
import { UserInfo } from '@app/db/models/userInfo.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UserInfoComment } from '@app/db/models/userInfoComment.model';


export class userInfoDto {
    @ApiProperty({description: '签名'})
    sign: string;
    @ApiProperty({description: '用户名'})
    userName: string;
    @ApiProperty({description: '地址'})
    address: string;
    @ApiProperty({description: '工作地址'})
    workAddress: string;
    @ApiProperty({description: '打算'})
    industry: string;
    @ApiProperty({description: '未来计划'})
    futurePlanning: string;
    @ApiProperty({description: '难忘的事'})
    unforgettable: string
    @ApiProperty({description: '生日'})
    birthday: string;
    @ApiProperty({description: '头像'})
    avatar: string;
    @ApiProperty({description: '相册'})
    imgs: string [];
}

// tslint:disable-next-line: max-classes-per-file
@Controller('user-info')
export class UserInfoController {
    constructor(
        @InjectModel(UserInfo) private  readonly  userInfoModel: ModelType <Comment>,
        @InjectModel(UserInfoComment) private  readonly  userInfoCommentModel: ModelType <Comment>,
    ) { }
    @Post('/')
    @ApiOperation({summary: '获取用户信息'})
    async index(@Body() body) {
        const {userName} = body;
        if ( userName) {
            return this.userInfoModel.find({userName});
        } else {
            return this.userInfoModel.find();
        }
    }

    @Put('/update')
    @ApiOperation({summary: '修改用户信息'})
    async update(@Body() body) {
        if (body) {
            const {userName,editObject}=body;
            return this.userInfoModel.updateOne({userName}, { ...editObject}, { multi: true });
        } else {
            return {
                status: 400,
                message: '修改失败',
            };
        }
    }
    @Put('/uploadImg')
    @ApiOperation({summary: '上传照片'})
    async uploadImg(@Body() body) {
        try{
            const {userName,url} = body;
            const imgs = (await this.userInfoModel.findOne({userName}))['imgs'];
            imgs.unshift(url);
            await this.userInfoModel.updateOne({userName}, {imgs});
            return {
                status: 200,
                message: '图片添加成功',
            };
        } catch ( e) {
            return {
                status: 500,
                message: e,
            };
        }
    }


    @Put('/deleteImg')
    @ApiOperation({summary: '删除照片'})
    async deleteImg(@Body() body) {
        try{
            const {userName,index} = body;
            const imgs = (await this.userInfoModel.findOne({userName}))['imgs'];
            imgs.splice(index,1);
            await this.userInfoModel.updateOne({userName}, {imgs});
            return {
                status: 200,
                message: '图片删除成功',
            };
        } catch ( e) {
            return {
                status: 500,
                message: e,
            };
        }
    }

    @Post('/addComment')
    @ApiOperation({summary: '添加评论'})
    async addComment(@Body() body){
        const {userName,commentInfo} =body;
        const comments=(await this.userInfoCommentModel.findOne({userName}))["comments"];
        comments.unshift(commentInfo);
        return this.userInfoCommentModel.updateOne({userName},{comments})
    }

    @Post("/getComment")
    @ApiOperation({summary: '获取评论列表'})
    async getComment(@Body() body){
        const {userName}=body;
        return this.userInfoCommentModel.find({userName});
    }
    
    @Post('/addUserInfo')
    @ApiOperation({summary: '添加用户信息'})
    async addUserInfo(@Body() body: userInfoDto){
        console.log(body)
        await this.userInfoModel.create({...body})
    }
}
