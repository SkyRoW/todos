import { User } from "../../user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoList } from "./todo-list.entity";
import { ItemState } from "../enum/item-state.enum";

@Entity()
export class TodoListItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    freeText: string;

    @Column({ nullable: false })
    deadline: Date;

    @Column({
        default: ItemState.ACTIVE,
        type: 'varchar',
        enum: ItemState,
    })
    state: ItemState;

    @Column({ nullable: false })
    creatorId: string;
    @ManyToOne(() => User, user => user.createdLists)
    creator: User;

    @Column({ nullable: false})
    todoListId: string;
    @ManyToOne(() => TodoList, todoList => todoList.items)
    todoList: TodoList;
}