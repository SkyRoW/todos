import { IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    public name: string;
}