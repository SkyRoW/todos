import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateListDto } from "../model/create-list.dto";
import { ListDal } from "../dal/list.dal";
import { AddListItemDto } from "../model/add-list-item.dto";
import { PatchListItemDto } from "../model/patch-list-item.dto";
import { ListPayload } from "../model/list-payload";
import { PatchListDto } from "../model/patch-list.dto";
import { UserListsPayload } from "../model/user-lists.payload";
import { ListMappingService } from "./list-mapping.service";
import { ListItemPayload } from "../model/list-item.payload";
import { UserService } from "../../user/service/user.service";
import { TodoList } from "../entity/todo-list.entity";

@Injectable()
export class ListService {
    constructor(
        private listDal: ListDal,
        private listMappingService: ListMappingService,
        private userService: UserService,
    ) {}

    public async getUserLists(userId: string): Promise<UserListsPayload> {
        const userWithLists = await this.userService.getUserWithListsById(userId);
        return this.listMappingService.mapUserToUserListsPayload(userWithLists);
    }

    public async getListById(listId: string): Promise<ListPayload> {
        const list = await this.listDal.getListById(listId);
        return this.listMappingService.mapListToListPayload(list);
    }

    public async createList(userId: string, createListDto: CreateListDto): Promise<ListPayload> {
        const createdList = await this.listDal.createList(userId, createListDto);
        return this.listMappingService.mapListToListPayload(createdList);
    }

    private async validateListAccess(userId: string, list: TodoList) {
        if (list.creatorId !== userId && !list.collaborators.find(collaborator => collaborator.id === userId)) {
            throw new UnauthorizedException();
        } 
    }

    public async addItemToList(userId: string, listId: string, addListItemDto: AddListItemDto): Promise<void> {
        const list = await this.listDal.getListById(listId);
        await this.validateListAccess(userId, list);
        return this.listDal.addItemToList(userId, listId, addListItemDto);
    }

    public async patchList(userId: string, listId: string, patchListDto: PatchListDto): Promise<void> {
        const { collaboratorIds } = patchListDto;
        const list = await this.listDal.getListById(listId);
        await this.validateListAccess(userId, list);

        const collaborators = await Promise.all(collaboratorIds.map(async id => {
            return await this.userService.getUserById(id);
        }));

        await this.listDal.patchList(list, collaborators);
    }
 
    public async patchListItem(userId: string, listItemId: string, patchListItemDto: PatchListItemDto): Promise<ListItemPayload> {
        const listItem = await this.listDal.getListItemById(listItemId);
        await this.validateListAccess(userId, listItem.todoList);

        const patchedListItem = await this.listDal.patchListItem(listItemId, patchListItemDto);
        return this.listMappingService.mapListItemToListItemPayload(patchedListItem);
    }
}