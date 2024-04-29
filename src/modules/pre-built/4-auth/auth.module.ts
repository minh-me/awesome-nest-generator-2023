import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "~pre-built/1-users/user.module";
import { TokenModule } from "~pre-built/5-tokens/token.module";
import { MailModule } from "~shared/mail/mail.module";
import { HashingService } from "../1-users/hashing/hashing.service";
import { OtpModule } from "../6-otp/otp.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
@Module({
	imports: [
		TokenModule,
		ConfigModule,
		UserModule,
		JwtModule,
		MailModule,
		OtpModule,
	],
	providers: [AuthService, HashingService],
	controllers: [AuthController],
})
export class AuthModule {}
