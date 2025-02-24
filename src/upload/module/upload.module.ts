import { Module } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { UploadController } from '../controllers/upload.controller';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
