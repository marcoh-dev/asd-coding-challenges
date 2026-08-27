import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import * as bcrypt from "bcrypt";
import { TSafeUser } from "../users/users.type";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<TSafeUser | null> {
		const user = await this.usersService.findByUsername(username);
		if (user && (await bcrypt.compare(password, user.passwordHash))) {
			const { passwordHash: _, ...safeUser } = user;
			return safeUser;
		}
		return null;
	}

	login(user: User) {
		const payload = {
			username: user.username,
			sub: user.id,
			createdAt: user.createdAt,
			//roles: user.roles,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
