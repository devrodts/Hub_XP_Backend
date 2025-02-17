import { Product } from "src/product/schemas/product.schema";
import { Order, OrderReport } from "../interfaces";

export interface OrderReportDTO extends OrderReport { 
    _id: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    startDate: Date;
    endDate: Date;
    orders?: Order[];
}
