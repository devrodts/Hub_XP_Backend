import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../services/order.service';
import { CreateOrderDTO } from '../dtos';
import { UpdateOrderDTO } from '../dtos';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.ordersService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateOrderDto: UpdateOrderDTO) {
    return this.ordersService.update(_id, updateOrderDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.ordersService.remove(_id);
  }
}
