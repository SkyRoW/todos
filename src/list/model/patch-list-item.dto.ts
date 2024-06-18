import { IsEnum } from "class-validator";
import { ItemState } from "../enum/item-state.enum";

export class PatchListItemDto {
    @IsEnum(ItemState)
    public state: ItemState;
}