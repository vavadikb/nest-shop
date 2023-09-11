import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/cart.entity';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class CartService {
    constructor(
      @InjectRepository(Cart)
      private readonly cartRepository: Repository<Cart>,
      private authService: AuthService,
      private productService: ProductsService
    ) {}
  
    async addToCart(userId: number, productId: number): Promise<Cart> {
      const cartItem = new Cart();
      cartItem.user = await this.authService.findOne(userId)
      cartItem.product = await this.productService.findOne(productId);
      return await this.cartRepository.save(cartItem);
    }
  
    async getCartItems(userId: number): Promise<Cart[]> {
      return await this.cartRepository.find({
        where: { user: { id: userId } },
      });
    }

    async removeFromCart(cartItemId: number): Promise<void> {

      // Проверяем, существует ли корзина пользователя
      // const user = await this.authService.findOne(userId);
      // if (!user) {
      //   throw new NotFoundException(`User with ID ${userId} not found`);
      // }
  
      // // Находим элемент корзины пользователя
      // const cartItem = user.cartItems.find(item => item.id === cartItemId);
      // if (!cartItem) {
      //   throw new NotFoundException(`CartItem with ID ${cartItemId} not found in the user's cart`);
      // }
  
      // Удаляем элемент из корзины
      const cartItem = await this.cartRepository.findOne({where:{id:cartItemId}})
      await this.cartRepository.delete({ id: cartItemId });
;
    }
    
  }
  
  
  
  
  
  