import { Injectable, OnModuleInit } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Express } from 'express';
import { Multer } from 'multer';

@Injectable()
export class UploadService implements OnModuleInit {
  private s3: AWS.S3;
  private bucketName: string = process.env.S3_BUCKET || 'products-images';

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      s3ForcePathStyle: true,
      region: process.env.AWS_REGION,
    });
  }

  async onModuleInit() {
    try {
      await this.s3.headBucket({ Bucket: this.bucketName }).promise();
      console.log(`Bucket ${this.bucketName} já existe.`);
    } catch (err) {
      console.log(`Bucket ${this.bucketName} não encontrado. Criando...`);
      try {
        await this.s3.createBucket({ Bucket: this.bucketName }).promise();
        console.log(`Bucket ${this.bucketName} criado com sucesso.`);
      } catch (createErr) {
        console.error(`Erro ao criar bucket:`, createErr);
      }
    }
  }
  
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await this.s3.upload(uploadParams).promise();
    
    const url = new URL(data.Location);
    if (process.env.NODE_ENV !== 'production') {
      url.hostname = 'localhost';
    }
    return url.toString();
  }
}