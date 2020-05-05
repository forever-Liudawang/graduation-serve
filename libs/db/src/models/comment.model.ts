import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class Comment {
    @prop()
    @ApiProperty({description: '留言'})
    commentInfo: string;

    @prop()
    @ApiProperty({description: '用户名'})
    userName: string;
}
