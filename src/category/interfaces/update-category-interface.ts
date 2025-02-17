import { Product } from "src/product/schemas/product.schema"

export interface UpdateCategoryInterface {
    _id: string;
    name?: string
    updatedAt?: Date 
    createdAt?: Date
    products?: Product[]
}
