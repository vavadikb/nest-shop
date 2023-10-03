import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { ProductDto } from './dto/product.dto';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() product: Product): Promise<Product> {
    const createdProduct = await this.productService.create(product);
    return createdProduct;
  }
  

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() product: ProductDto ): Promise<Product> {
    const updatedProduct = await this.productService.update(id, product);
    return updatedProduct;
  }
  
  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(): Promise<Product[]> {
    const products = await this.productService.findAll();
    return products;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) 
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.productService.findOne(id);
    return product;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.remove(id);
  }
}