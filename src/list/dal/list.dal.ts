import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoList } from "../entity/todo-list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoListItem } from "../entity/todo-list-item.entity";
import { CreateListDto } from "../model/create-list.dto";
import { AddListItemDto } from "../model/add-list-item.dto";
import { PatchListItemDto } from "../model/patch-list-item.dto";
import { User } from "../../user/entity/user.entity";

@Injectable()
export class ListDal {
    constructor(
        @InjectRepository(TodoList) private todoListRepository: Repository<TodoList>,
        @InjectRepository(TodoListItem) private todoListItemRepository: Repository<TodoListItem>,
    ) {}

    public async getListItemById(listItemId: string): Promise<TodoListItem> {
        const item = await this.todoListItemRepository.findOne({where: {id: listItemId}, relations: [
            'todoList',
            'todoList.creator',
            'todoList.collaborators',
        ]});
        if (!item) {
            throw new NotFoundException('List item not found');
        }
        return item;
    }

    public async getListById(listId: string): Promise<TodoList> {
        const list = await this.todoListRepository.findOne({where: {id: listId}, relations: ['items','collaborators','creator']});
        if (!list) {
            throw new NotFoundException('List not found');
        }
        return list;
    }

    public async createList(userId: string, createListDto: CreateListDto): Promise<TodoList> {
        const { name } = createListDto;
        const newList = this.todoListRepository.create({
            creatorId: userId,
            name
        })
        return this.todoListRepository.save(newList);
    }

    public async addItemToList(userId: string, listId: string, addListItemDto: AddListItemDto): Promise<void> {
        const { title, freeText, deadline } = addListItemDto;
        const newItem = this.todoListItemRepository.create({
            creatorId: userId,
            todoListId: listId,
            title,
            freeText,
            deadline
        })
        await this.todoListItemRepository.insert(newItem);
    }

    public async patchListItem(itemId: string, patchListItemDto: PatchListItemDto): Promise<TodoListItem> {
        const { state } = patchListItemDto;
        const item = await this.todoListItemRepository.findOneBy({ id: itemId });
        if (!item) {
            throw new NotFoundException('List item not found');
        }
        return this.todoListItemRepository.save({
            ...item,
            state,
        });
    }

    public async patchList(list: TodoList, collaborators: User[]): Promise<TodoList> {
        return this.todoListRepository.save({
            ...list,
            collaborators            
        });
    }
}