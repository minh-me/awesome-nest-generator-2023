import { FileType } from "~utils/types/file.type";

import { ConfigName } from "./config.enum";

export interface IConfiguration {
	[ConfigName.app]: AppConfig;
	[ConfigName.database]: DatabaseConfig;
	[ConfigName.cloudinary]: CloudinaryConfig;
	[ConfigName.otp]: OtpConfig;
	[ConfigName.upload]: UploadConfig;
	[ConfigName.jwt]: JWTConfig;
	[ConfigName.mailer]: MailerConfig;
	[ConfigName.mailer]: MailerConfig;
	[ConfigName.apple]: AppleConfig;
	[ConfigName.facebook]: FacebookConfig;
	[ConfigName.google]: GoogleConfig;
}

export interface AppConfig {
	nodeEnv: string;
	port: number;
	appUrl: string;
	appName: string;
	storageServer: string;
}

export interface DatabaseConfig {
	name: string;
	uri: string;
}

export interface CloudinaryConfig {
	config: {
		cloud_name: string;
		api_key: string;
		api_secret: string;
	};
	options: {
		folder: string;
	};
}

export interface OtpConfig {
	expiresIn: number;
}

export interface FileOption {
	maxSize: number;
	allowedExtensions: string[];
}

export interface UploadConfig {
	imageMaxSize: number;
	rawMaxSize: number;
	videoMaxSize: number;
	autoMaxSize: number;

	imageMaxFiles: number;
	rawMaxFiles: number;
	videoMaxFiles: number;
	autoMaxFiles: number;

	imagesExt: string;
	rawExt: string;
	videoExt: string;
	autoExt: string;

	image: FileOption;
	auto: FileOption;
	video: FileOption;
	raw: FileOption;
	storageFolders: Record<FileType, string>;
}

export interface MailerConfig {
	isGmailServer: string;

	transport: {
		gmail: {
			host: string;
			secure: boolean;
			port: number;
			auth: {
				user: string;
				pass: string;
			};
		};

		sendgrid: {
			host: string;
			auth: {
				user: string;
				pass: string;
			};
		};
	};
	defaults: { from: string };
	name: string;
}

export interface JWTConfig {
	secretKey: string;
	expiresIn: number;
	accessToken: {
		expiresIn: number;
		secretKey: string;
	};
	refreshToken: {
		expiresIn: number;
		secretKey: string;
	};
	registerToken: {
		expiresIn: number;
		secretKey: string;
	};
	forgotPasswordToken: {
		expiresIn: number;
		secretKey: string;
	};
}

export interface UrlConfig {
	resetPasswordUrl: string;
	verifyAccountUrl: string;
}

export interface RedisConfig {
	redisUrl: string;
}

export interface AppleConfig {
	appAudience: string[];
}

export interface FacebookConfig {
	appId: string;
	appSecret: string;
}

export type GoogleConfig = {
	clientId: string;
	clientSecret: string;
};

export type AwsConfig = {
	url: string;
	accessKeyId: string;
	secretAccessKey: string;
	region: string;
	endpoint: string;
	bucketName: string;
	backupBucketName: string;
};
