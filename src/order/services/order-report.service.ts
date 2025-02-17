import { Injectable } from '@nestjs/common';
import { OrderReportDTO } from '../dtos/order-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderReportService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async getReport(startDate?: Date, endDate?: Date): Promise<OrderReportDTO[]> {
    const filter: any = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = startDate;
      if (endDate) filter.createdAt.$lte = endDate;
    }
    const orders = await this.orderModel.find(filter).populate('products').exec();
    return orders.map(order => ({
      _id: order._id,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      products: order.products,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
    }));
  }
}