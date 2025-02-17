import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from '../services/order.service';
import { OrdersController } from '../controllers/orders.controller';
import { Order, OrderSchema } from '../schemas/order.schema';
import { Product, ProductSchema } from '../../Product/schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema },
    { name: Product.name, schema: ProductSchema }
  ])
],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
