import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly users: Repository<User>,
	) {}

	findByUsername(username: string): Promise<User | null> {
		return this.users.findOneBy({ username });
	}

	async createUser(userPayload: CreateUserDto): Promise<User> {
		const { password, username } = userPayload;

		const usernameExists = await this.findByUsername(username);
		if (usernameExists) {
			throw new ConflictException("Username is already taken");
		}

		const passwordHash = await bcrypt.hash(password, 12);

		const user = this.users.create({ username, passwordHash });
		return this.users.save(user);
	}
}
