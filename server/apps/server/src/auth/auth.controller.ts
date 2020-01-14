import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class RegisterDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller('auth')
@ApiTags('用户')
export class AuthController {

  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() dto) {
    return dto;
  }

  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  async user() {
    return {};
  }
}
