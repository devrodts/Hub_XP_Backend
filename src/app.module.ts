import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/models/product.module';
import { OrdersModule } from './order/models/order.module';
import { CategoriesModule } from './category/models/categories.module';
// import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/module/upload.module';

const MONGO_URI = process.env.MONGO_URI

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('MONGO_URI:', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    ProductModule,
    OrdersModule,
    CategoriesModule,
    // UsersModule,
    UploadModule,
  ],
})
export class AppModule {}
