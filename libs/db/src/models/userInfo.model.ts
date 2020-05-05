import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})
export class UserInfo {
    @prop()
    @ApiProperty({description: '个性签名'})
    sign: string;

    @prop()
    @ApiProperty({description: '用户名'})
    userName: string;

    @prop()
    @ApiProperty({description: '家庭住址'})
    address: string;

    @prop()
    @ApiProperty({description: '工作地'})
    workAddress: string;

    @prop()
    @ApiProperty({description: '从事行业'})
    industry: string;

    @prop()
    @ApiProperty({description: '未来规划'})
    futurePlanning: string;

    @prop()
    @ApiProperty({description: '难忘的事'})
    unforgettable: string;

    @prop()
    @ApiProperty({description: '生日'})
    birthday: string;

    @prop()
    @ApiProperty({description: '用户头像'})
    avatar: string;

    @prop()
    @ApiProperty({description: '用户照片'})
    imgs: string[];
}
