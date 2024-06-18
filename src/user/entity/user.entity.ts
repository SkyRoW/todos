import { TodoListItem } from "../../list/entity/todo-list-item.entity";
import { TodoList } from "../../list/entity/todo-list.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => TodoListItem, todoListItem => todoListItem.creator)
    creadedItems: TodoListItem[];

    @OneToMany(() => TodoList, todoList => todoList.creator)
    createdLists: TodoList[];

    @ManyToMany(() => TodoList, todoList => todoList.collaborators)
    @JoinTable()
    collaboratedLists: TodoList[];
}