import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CurrentUser } from "../../auth/decorator/current-user.decorator";
import { UserPayload } from "../../user/model/user.payload";
import { CreateListDto } from "../model/create-list.dto";
import { ListService } from "../service/list.service";
import { AddListItemDto } from "../model/add-list-item.dto";
import { PatchListItemDto } from "../model/patch-list-item.dto";
import { Public } from "../../auth/decorator/public.decorator";
import { PatchListDto } from "../model/patch-list.dto";
import { UserListsPayload } from "../model/user-lists.payload";
import { ListPayload } from "../model/list-payload";
import { ListItemPayload } from "../model/list-item.payload";

@Controller('list')
export class ListController {

    constructor(
        private listService: ListService,
    ) {}

    @Get('user')
    public async getUserLists(
        @CurrentUser() user: UserPayload
    ): Promise<UserListsPayload> {
        return this.listService.getUserLists(user.id);
    }

    @Get(':listId')
    @Public()
    public async getListById(
        @Param('listId') listId: string
    ): Promise<ListPayload> {
        return this.listService.getListById(listId);
    }

    @Post()
    public async createList(
        @CurrentUser() user: UserPayload,
        @Body() createListDto: CreateListDto,
    ): Promise<ListPayload> {
        return this.listService.createList(user.id, createListDto);
    }

    @Patch(':listId')
    public patchList(
        @CurrentUser() user: UserPayload,
        @Param('listId') listId: string,
        @Body() patchListDto: PatchListDto
    ): Promise<void> {
        return this.listService.patchList(user.id, listId, patchListDto);
    }

    @Post(':listId/item')
    public async addListItem(
        @CurrentUser() user: UserPayload,
        @Param('listId') listId: string,
        @Body() addListItemDto: AddListItemDto,    
    ): Promise<void> {
        return this.listService.addItemToList(user.id, listId, addListItemDto);
    }

    @Patch('item/:itemId')
    public async patchListItem(
        @CurrentUser() user: UserPayload,
        @Param('itemId') itemId: string,
        @Body() patchListItemDto: PatchListItemDto,
    ): Promise<ListItemPayload> {
        return this.listService.patchListItem(user.id, itemId, patchListItemDto);
    }
}