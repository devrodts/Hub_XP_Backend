import * as AWS from 'aws-sdk';
import { UploadedFile } from '../interfaces/upload';
import { Injectable } from '@nestjs/common';
import { CreateUploadDTO } from '../dto/create-upload.dto';

@Injectable()
export class UploadRepository {
  private bucketName: string = process.env.S3_BUCKET || 'products-images';
  
  constructor(private readonly s3: AWS.S3) {
    this.s3 = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      s3ForcePathStyle: true,
      region: process.env.AWS_REGION,
    });
  }

  async create(upload: CreateUploadDTO): Promise<UploadedFile | null> {
    
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${upload.originalname}`, 
      Body: upload.buffer,
      ContentType: upload.mimetype,
    };

    const newUpload = await this.s3.upload(params).promise();
    if (!newUpload) {
      throw new Error('Erro ao criar o upload');
    }
    const uploadedFile: UploadedFile = {
      _id: newUpload.Key,
      imageUrl: newUpload.Location,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return uploadedFile;
  }
}