import { Expose, Type } from "class-transformer";
import { PaginationMetaResponseDto } from "../../common/dtos/paginationMetaResponse.dto";
import { ThreadResponseDto } from "./threadResponse.dto";

export class PaginatedThreadsResponseDto {
	@Expose()
	@Type(() => ThreadResponseDto)
	data!: ThreadResponseDto[];

	@Expose()
	@Type(() => PaginationMetaResponseDto)
	meta!: PaginationMetaResponseDto;
}
