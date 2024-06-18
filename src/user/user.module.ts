import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserDal } from './dal/user.dal';
import { UserMappingService } from './service/user-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserMappingService,
    UserDal,
  ],
  exports: [
    UserService,
    UserMappingService,
  ]
})
export class UserModule {}
