import { Injectable } from "@nestjs/common";
import { FileFormatted } from "~modules/pre-built/7-uploads/types/file-formatted.type";
import { UploadedError } from "~modules/pre-built/7-uploads/types/upload.error.type";
import { UploadedResult } from "~modules/pre-built/7-uploads/types/upload.result.type";

@Injectable()
export abstract class StorageService {
	abstract upload(file: FileFormatted): Promise<UploadedResult | UploadedError>;
	abstract delete(resourceId: string): Promise<{
		deletedAt: number;
		message: string;
	}>;
	abstract deleteMany(resourceIds: string[]): Promise<
		{
			deletedAt: number;
			message: string;
		}[]
	>;
}
