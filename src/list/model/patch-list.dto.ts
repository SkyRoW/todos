import { IsArray, IsString } from "class-validator";

export class PatchListDto {
    @IsArray()
    @IsString({ each: true })
    public collaboratorIds: string[];
}