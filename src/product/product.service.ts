/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Empty, Product, ProductList, CreateProductRequest } from '@/shared/types/proto/product';

@Injectable()
export class ProductService {
    private data: ProductList = {
        products: [
            { id: '0', productName: 'Item A', price: 1, description: 'Description A' },
            { id: '1', productName: 'Item B', price: 2, description: 'Description B' }
        ]
    };

    async getAllProducts(_: Empty): Promise<ProductList> {
        console.log("Called getAllProducts", (new Date()).toTimeString())
        return new Promise((resolve) => resolve(this.data))
    }

    async createProduct(request: CreateProductRequest): Promise<Product> {

        const { productName, price } = request
        if (!productName || !price) {
            throw new RpcException({ code: 3, message: "INVALID: Please input required fields." });
        }

        const newProduct: Product = {
            id: `${this.data.products.length}`,
            ...request,
        }
        this.data.products.push(newProduct)
        console.log("Create Successfully with length of products:", this.data.products.length);
        return new Promise((resolve) => resolve(newProduct));
    }
}
