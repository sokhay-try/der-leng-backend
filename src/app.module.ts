import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/validation-schema';
import { DatabaseModule } from './database/database.module';
import { ProvinceModule } from './api/province/province.module';
import { PlaceModule } from './api/place/place.module';
import { UploadImageModule } from './api/upload-image/upload-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    ProvinceModule,
    PlaceModule,
    UploadImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
