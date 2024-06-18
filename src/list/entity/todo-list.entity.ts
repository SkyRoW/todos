import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoListItem } from "./todo-list-item.entity";
import { User } from "../../user/entity/user.entity";

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => TodoListItem, item => item.todoList)
    items: TodoListItem[];

    @Column({ nullable: false })
    creatorId: string;
    @ManyToOne(() => User, creator => creator.createdLists)
    creator: User;

    @ManyToMany(() => User, collaborator => collaborator.collaboratedLists)
    collaborators: User[]
}