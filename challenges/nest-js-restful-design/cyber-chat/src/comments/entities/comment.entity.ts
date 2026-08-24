import { Thread } from "../../threads/entities/thread.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("comments")
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	body!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@Column({ default: "unknown" })
	author!: string;

	@ManyToOne(() => Thread)
	thread!: Thread;
}
