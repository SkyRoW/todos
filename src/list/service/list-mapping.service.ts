import { Injectable } from "@nestjs/common";
import { TodoList } from "../entity/todo-list.entity";
import { ListPayload } from "../model/list-payload";
import { TodoListItem } from "../entity/todo-list-item.entity";
import { ListItemPayload } from "../model/list-item.payload";
import { UserListsPayload } from "../model/user-lists.payload";
import { User } from "../../user/entity/user.entity";

@Injectable()
export class ListMappingService {

    public mapUserToUserListsPayload(user: User): UserListsPayload {
        return {
            createdLists: user.createdLists.map(list => this.mapListToListPayload(list)),
            collaboratedLists: user.collaboratedLists.map(list => this.mapListToListPayload(list))
        }
    }

    public mapListToListPayload(list: TodoList): ListPayload {
        return {
            id: list.id,
            name: list.name,
            items: list.items?.map(item => this.mapListItemToListItemPayload(item)),
        }
    }

    public mapListItemToListItemPayload(listItem: TodoListItem): ListItemPayload {
        return {
            id: listItem.id,
            title: listItem.title,
            freeText: listItem.freeText,
            deadline: listItem.deadline,
            state: listItem.state,
        }
    }
}