// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findOneOrFail({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    existingProduct.name = product.name;
    existingProduct.description = product.description;
    existingProduct.price = product.price
    

    await this.productRepository.save(existingProduct);
    return existingProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async remove(id: number): Promise<void> {
    const existingProduct = await this.productRepository.findOneOrFail({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(existingProduct);
  }
}
