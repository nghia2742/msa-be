import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty, Product, ProductList, CreateProductRequest } from '@/shared/types/proto/product';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
    @GrpcMethod('ProductService', 'getAllProducts')
    async getAllProducts(data: Empty): Promise<ProductList> {
      return this.productService.getAllProducts(data);
    }
  
    @GrpcMethod('ProductService', 'createProduct')
    async createProduct(data: CreateProductRequest): Promise<Product> {
      return this.productService.createProduct(data);
    }
}
