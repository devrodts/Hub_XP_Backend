import { Product } from "src/product/schemas/product.schema"

export interface CreateCategoryInterface {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
    products?: Product[]
}
