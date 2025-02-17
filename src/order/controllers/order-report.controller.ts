import { Controller, Get, Query } from '@nestjs/common';
import { OrderReportService } from '../services/order-report.service';
import { OrderReportDTO } from '../dtos/order-report.dto';

@Controller('orders/report')
export class OrderReportController {
  constructor(private readonly orderReportService: OrderReportService) {}

  @Get()
  async getReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<OrderReportDTO[]> {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.orderReportService.getReport(start, end);
  }
}