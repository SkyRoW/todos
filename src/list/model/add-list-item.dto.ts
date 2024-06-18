import { IsISO8601, IsString } from "class-validator";

export class AddListItemDto {
    @IsString()
    public title: string;
    
    @IsString()
    public freeText: string;

    @IsISO8601()
    public deadline: Date;
}