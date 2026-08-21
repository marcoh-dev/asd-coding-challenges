import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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

	@Column({ default: "unknon" })
	author!: string;
}
