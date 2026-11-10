import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity("threads")
export class Thread {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column("text")
	body!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@Column({ default: "unknown" })
	author!: string;

	@OneToMany(() => Comment, (comment) => comment.thread)
	comments!: Comment[];
}
