import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { User } from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/core/jwt-config.service';
import { AuthHelper } from './helper/auth.helper';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
        useClass: JwtConfigService
    }),
    TypeOrmModule.forFeature([
        User
    ]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHelper,
  ],
})
export class AuthModule {}
