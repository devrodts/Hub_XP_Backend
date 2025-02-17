import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/product/schemas/product.schema';

import { CreateOrderDTO, UpdateOrderDTO } from '../dtos';
import { Order } from '../schemas/order.schema';


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<(Order & { products: Product[] })[]> {
    const orders = await this.orderModel.find().populate('products').lean().exec();
    return orders;
  }

  async findOne(_id: string): Promise<Order> {
    const order = await this.orderModel.findById(_id).populate('productIds').exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${_id} not found`);
    }
    return order;
  }

  async update(_id: string, updateOrderDto: UpdateOrderDTO): Promise<Order> {
    const existingOrder = await this.orderModel.findByIdAndUpdate(
      _id,
      updateOrderDto,
      { new: true },
    ).populate('productIds').exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${_id} not found`);
    }
    return existingOrder;
  }

  async remove(_id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(_id).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${_id} not found`);
    }
    return deletedOrder;
  }
}
