import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order.schema';
import { OrderReportService } from '../services/order-report.service';
import { OrderReportController } from '../controllers';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Order.name, schema: OrderSchema },
        { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [OrderReportController],
  providers: [OrderReportService],
})
export class OrderReportModule {}