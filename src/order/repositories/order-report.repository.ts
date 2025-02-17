import { Model } from "mongoose";
import { Order } from "../schemas/order.schema";

export class OrderReportRepository {
    constructor(private readonly orderModel: Model<Order>) {}

    async findAll(startDate?: Date, endDate?: Date): Promise<Order[]> {
        const query: any = {};

        if (startDate) query.createdAt = { $gte: startDate };
        if (endDate) query.createdAt = { $lte: endDate };

        return this.orderModel.find(query).exec();
    }
}   
