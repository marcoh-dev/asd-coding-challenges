import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(5000)
	body!: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(20)
	author!: string;
}
