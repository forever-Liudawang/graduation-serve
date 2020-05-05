import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class UserInfoComment {
    @prop()
    @ApiProperty({description: '用户名'})
    userName: string;

    @prop()
    @ApiProperty({description: '用户评论'})
    comments: object [];

}
