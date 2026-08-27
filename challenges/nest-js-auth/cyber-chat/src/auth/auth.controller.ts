import { Body, Controller, Get, Post, Request, SerializeOptions, UseGuards } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/createUser.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { Public } from "../common/decorators/public.decorator";
import { UserResponseDto } from "../users/dtos/userResponse.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Get("me")
	getMe(@Request() req) {
		return req.user;
	}

	@Public()
	@Post("register")
	@SerializeOptions({ type: UserResponseDto })
	register(@Body() userPayload: CreateUserDto) {
		return this.usersService.createUser(userPayload);
	}

	@Public()
	@UseGuards(AuthGuard("local"))
	@Post("login")
	login(@Request() req, @Body() _loginDto: LoginDto) {
		return this.authService.login(req.user);
	}
}
