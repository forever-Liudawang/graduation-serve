import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class User {
    @prop()
    @ApiProperty({description: '账户名称'})
    userCount: string;

    @prop()
    @ApiProperty({description: '用户名'})
    userName: string;

    @prop()
    @ApiProperty({description: '密码'})
    password: string;
}
