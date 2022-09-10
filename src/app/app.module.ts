import { join } from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import {
  appCofig,
  cloudinaryCofig,
  databaseCofig,
  jwtCofig,
  mailerConfig,
  uploadConfig,
} from '~config/enviroment';
import { DatabaseModule } from '~config/database/database.module';
import { MailModule } from '~lazy-modules/mail/mail.module';
import { SeedModule } from '~lazy-modules/seed/seed.module';
import { LoggerModule } from '~lazy-modules/logger/logger.module';
import { AuthModule } from '~authentications/a1-auth/auth.module';
import { OtpModule } from '~authentications/a2-otp/otp.module';
import { UserModule } from '~common/c1-users/user.module';
import { ProvinceModule } from '~common/c2-provinces/province.module';
import { UploadModule } from '~common/c6-upload/upload.module';
import { FileModule } from '~common/c5-files/file.module';
import { NotificationModule } from '~common/c7-notifications/notification.module';
import { ApiQueryParamsMiddleware } from '~middlewares/api-query-params.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        cloudinaryCofig,
        databaseCofig,
        jwtCofig,
        mailerConfig,
        uploadConfig,
        appCofig,
      ],
    }),
    DatabaseModule,
    UserModule,
    ProvinceModule,
    MailModule,
    OtpModule,
    AuthModule,
    SeedModule,
    LoggerModule,
    FileModule,
    UploadModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiQueryParamsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
