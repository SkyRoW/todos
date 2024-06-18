import { ItemState } from "../enum/item-state.enum";

export class ListItemPayload {
    public id: string;
    public title: string;
    public freeText: string;
    public deadline: Date;
    public state: ItemState;
}