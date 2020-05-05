import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from '@app/db/models/user.model';

// tslint:disable-next-line: class-name
class loginDto {
    @ApiProperty({description: '用户名'})
    @IsNotEmpty({message: '请填写用户名'})
    userCount: String;

    @ApiProperty({description: '密码'})
    @IsNotEmpty({message: ''})
    password: String;
}

// tslint:disable-next-line: max-classes-per-file
@Controller('login')
export class LoginController {
    constructor(
        @InjectModel(User) private  readonly  userModel: ModelType <User>,
    ) {}
    
    @Post()
    @ApiOperation({summary: '登录'})
    async index(@Body() body: loginDto) {
        const user = await this.userModel.findOne({userCount : body.userCount});
        if (user) {
            if (user.password === body.password) {
                return {
                    code: 200,
                    message: '登录成功',
                    userName:user.userName
                };
            } else {
                return {
                    code: 400,
                    message: '用户名或密码错误',
                };
            }
        } else {
            return {
                code: 400,
                message: '用户名或密码错误',
            };
        }
    }
}
