import { Product } from "src/product/schemas/product.schema";

export interface Order {
    _id: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
  