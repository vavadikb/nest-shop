// products.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { AuthGuard } from 'src/auth/local-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() product: Product): Promise<Product> {
    return this.productService.update(id, product);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
