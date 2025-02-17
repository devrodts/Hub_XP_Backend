import { ProductInterface } from "../interfaces/product-interface";

export class DeleteProductDTO {

    private readonly _id: string

    constructor(_id: string){
        this._id = _id
    }

   async deleteProduct(_id: string): Promise<ProductInterface | null>{
    
        return null    

    }
}


