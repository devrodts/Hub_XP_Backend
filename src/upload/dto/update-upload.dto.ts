import { PartialType } from '@nestjs/swagger';
import { CreateUploadDTO } from './create-upload.dto';

export class UpdateUploadDto extends PartialType(CreateUploadDTO) {}
