import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ParseObjectIdPipe } from "src/utils/parse-object-id.pipe";
import { stringIdToObjectId } from "src/utils/stringId_to_objectId";
import { GetAqp } from "~decorators/get-aqp.decorator";
import { PaginationDto } from "~dto/pagination.dto";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { MenuService } from "./menu.service";
@Controller("menus")
export class MenuController {
	constructor(private readonly menuService: MenuService) {}

	//  ----- Method: GET -----

	@Get()
	async findMany(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.menuService.findMany(filter, options);
	}

	@Get("paginate")
	async paginate(@GetAqp() { filter, ...options }: PaginationDto) {
		return this.menuService.paginate(filter, options);
	}

	@Get("count")
	async count(@GetAqp("filter") filter: PaginationDto) {
		return this.menuService.count(filter);
	}

	@Get(":id")
	async findOneById(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@GetAqp() { projection, populate }: PaginationDto,
	) {
		return this.menuService.findById(id, { projection, populate });
	}

	//  ----- Method: POST -----

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: CreateMenuDto) {
		return this.menuService.create(body);
	}

	//  ----- Method: PATCH -----

	@Patch(":id")
	@HttpCode(HttpStatus.OK)
	async update(
		@Param("id", ParseObjectIdPipe) id: Types.ObjectId,
		@Body() body: UpdateMenuDto,
	) {
		return this.menuService.updateById(id, body);
	}

	//  ----- Method: DELETE -----

	@Delete(":ids/ids")
	@HttpCode(HttpStatus.OK)
	async deleteManyByIds(@Param("ids") ids: string) {
		return this.menuService.deleteMany({
			_id: { $in: ids.split(",").map(stringIdToObjectId) },
		});
	}

	@Delete(":id")
	@HttpCode(HttpStatus.OK)
	async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
		return this.menuService.deleteById(id);
	}
}
