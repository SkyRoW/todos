import { Module } from '@nestjs/common';
import { ListController } from './controller/list.controller';
import { ListService } from './service/list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entity/todo-list.entity';
import { TodoListItem } from './entity/todo-list-item.entity';
import { ListDal } from './dal/list.dal';
import { UserModule } from '../user/user.module';
import { ListMappingService } from './service/list-mapping.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
        TodoList,
        TodoListItem
    ])
  ],
  controllers: [ListController],
  providers: [
    ListService,
    ListDal,
    ListMappingService,
  ],
})
export class ListModule {}
