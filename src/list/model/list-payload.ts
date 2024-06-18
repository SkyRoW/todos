import { ListItemPayload } from "./list-item.payload";

export class ListPayload {
    public id: string;
    public name: string;
    public items: ListItemPayload[];
}