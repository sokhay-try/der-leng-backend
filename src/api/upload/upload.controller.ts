import { Controller, Post } from '@nestjs/common';

@Controller('api/upload')
export class UploadController {
  @Post()
  uploadFile() {
    console.log('===upload image ====');
  }
}
