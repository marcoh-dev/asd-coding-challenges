import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { buttonVariants } from "./ui/button";

type FormValues = {
	title: string;
	language: "CSS" | "JavaScript" | "TypeScript";
	description: string;
	code: string;
};

export default function SnippetAddForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	function onSubmit(data: FormValues) {
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<Label htmlFor="title">Title</Label>
				{errors.title && <p className="text-red-500">{errors.title.message}</p>}
				<Input
					{...register("title", {
						required: "Title is required",
						minLength: {
							value: 2,
							message: `Title must be at least 2 characters`,
						},
					})}
					placeholder="Title"
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="language">Language</Label>
				{errors.language && <p className="text-red-500">{errors.language.message}</p>}
				<select
					{...register("language", {
						required: "Language is required",
					})}
				>
					<option value="CSS">CSS</option>
					<option value="JavaScript">JavaScript</option>
					<option value="TypeScript">TypeScript</option>
				</select>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="description">Description</Label>
				{errors.description && <p className="text-red-500">{errors.description.message}</p>}
				<input {...register("description")} placeholder="Description" />
			</div>

			<div className="grid gap-2">
				<Label htmlFor="code">Code</Label>
				{errors.code && <p className="text-red-500">{errors.code.message}</p>}
				<input
					{...register("code", {
						required: "Code is required",
						minLength: { value: 2, message: "Code must be at least 2 characters" },
					})}
					placeholder="Code"
				/>
			</div>

			<button type="submit" className={buttonVariants({ variant: "default", size: "lg" })}>
				Create snippet
			</button>
		</form>
	);
}
