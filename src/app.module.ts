import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/validation-schema';
import { DatabaseModule } from './database/database.module';
import { ProvinceModule } from './api/province/province.module';
import { PlaceModule } from './api/place/place.module';
import { UploadModule } from './api/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    ProvinceModule,
    PlaceModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
