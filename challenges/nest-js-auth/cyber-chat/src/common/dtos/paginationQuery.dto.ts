import { IsInt, IsOptional, Min, Max, IsIn, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PaginationQueryDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	@Type(() => Number)
	page: number = 1;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(100)
	@Type(() => Number)
	limit: number = 10;

	@IsIn(["-createdAt", "createdAt"])
	sort: string = "-createdAt";

	@IsOptional()
	@IsString()
	author?: string;

	@IsOptional()
	@IsString()
	startDate?: string;
}
