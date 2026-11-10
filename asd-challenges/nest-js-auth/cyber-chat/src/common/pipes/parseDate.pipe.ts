import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseDatePipe implements PipeTransform<string | undefined, Date> {
	transform(value: string | undefined): Date {
		if (value === undefined) {
			return new Date(0);
		}

		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			throw new BadRequestException(`Invalid date: "${value}"`);
		}

		return date;
	}
}
