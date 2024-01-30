import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
	@ApiProperty({
		example: "thumbnail-url",
		description: "URL of the product thumbnail",
	})
	@IsNotEmpty()
	@IsString()
	thumbnail: string;

	@ApiProperty({
		example: "Product Name",
		description: "Name of the product",
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: 1, description: "Position of the product" })
	@IsNotEmpty()
	@IsNumber()
	position: number;

	@ApiProperty({
		example: "10",
		description: "Number of stores in the product",
	})
	@IsNotEmpty()
	@IsString()
	countStores: string;

	@ApiProperty({
		example: false,
		description: 'Flag indicating if the product is "Other"',
	})
	@IsBoolean()
	isOther: boolean;

	@ApiProperty({
		example: true,
		description: "Flag indicating if the product is active",
	})
	@IsBoolean()
	isActive: boolean;
}
