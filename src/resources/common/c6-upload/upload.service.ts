/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { FileService } from '~common/c5-files/file.service';
import { CloudinaryService } from '~lazy-modules/storage/cloudinary/cloudinary.service';
import { LocalStorageService } from '~lazy-modules/storage/local-storage/local-storage.service';
import { UploadHelper } from './upload.helper';
@Injectable()
export class UploadService {
  constructor(
    private readonly fileService: FileService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly localStorageService: LocalStorageService,
    private readonly uploadHelper: UploadHelper,
  ) {}

  /**
   * Save file to local
   *
   * @param filePath
   * @returns
   */
  async saveFileToLocal(filePath: string, userId?: Types.ObjectId) {
    // check file
    const realpathOfFile = await this.uploadHelper.getRealpathOfFile(filePath);

    const result = await this.localStorageService.upload(realpathOfFile);

    const { files, size, folder } = result;

    const [type, ext] = result?.type?.split('/')
      ? result.type.split('/')
      : ['raw', realpathOfFile.slice(realpathOfFile.lastIndexOf('.') + 1)];

    // save file to database
    const item = {
      resourceID: files[0],
      ext,
      type,
      size,
      files,
      folder,
      storage: 'LOCAL_DISK',
      // owner: userId,
    };

    await this.fileService.create(item);

    return item.files;
  }

  /**
   * Save video to local
   *
   * @param filePath
   * @returns
   */
  async saveVideoToLocal(filePath: string, userId?: Types.ObjectId) {
    // check file
    const realpathOfFile = await this.uploadHelper.getRealpathOfFile(filePath);

    const result = await this.localStorageService.uploadVideo(realpathOfFile);

    const { files, size, folder } = result;

    // save file to database
    const item = {
      resourceID: files[0],
      type: 'video',
      ext: realpathOfFile.slice(realpathOfFile.lastIndexOf('.') + 1),
      size,
      files,
      folder,
      storage: 'LOCAL_DISK',
      // owner: userId,
    };

    await this.fileService.create(item);

    return files;
  }
  /**
   * Save file to Cloudinary
   *
   * @param filePath
   * @returns
   */
  async saveFileToCloudinary(filePath: string, userId?: Types.ObjectId) {
    const realpathOfFile = await this.uploadHelper.getRealpathOfFile(filePath);
    const imageExpression = `.(${process.env.UPLOAD_IMAGE_FILE})$`;

    // check allow file
    const isUploadImage = filePath.match(new RegExp(imageExpression));

    // upload file to cloudinary
    const result = await this.cloudinaryService.upload(realpathOfFile, {
      resource_type: isUploadImage ? 'image' : 'raw',
    });

    const files = isUploadImage
      ? this.cloudinaryService.getAllResizeImage(result.url, result.public_id)
      : [result.url];

    // save file to database
    const item = {
      resourceID: result.public_id,
      ext:
        result.format ||
        realpathOfFile.slice(realpathOfFile.lastIndexOf('.') + 1),
      type: result.resource_type,
      createdAt: result.created_at,
      size: result.bytes,
      files,
      secureUrl: result.secure_url,
      folder: result.folder,
      storage: 'CLOUDINARY',
      // owner: userId,
    };

    await this.fileService.create(item);

    // success
    return files;
  }

  /**
   * Save file to S3
   *
   * @param filePath
   * @returns
   */
  async saveFileToS3(filePath: string, userId?: Types.ObjectId) {
    return { filePath, userId };
  }
}
