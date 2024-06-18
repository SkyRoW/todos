import { ListPayload } from "./list-payload";

export class UserListsPayload {
    createdLists: ListPayload[];
    collaboratedLists: ListPayload[];
}