import { Product } from "src/product/schemas/product.schema";
import { Order } from "./order-interface";


export interface OrderReport{
    _id: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    startDate: Date;
    endDate: Date;
    orders?: Order[];
}