import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/entities/cart.entity';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class CartService {
    constructor(
      @InjectRepository(Cart)
      private readonly cartRepository: Repository<Cart>,
      private productService: ProductsService,
      private userService: UserService
    ) {}
  
    async addToCart(userId: number, productId: number): Promise<Cart> {
      const cartItem = new Cart();
      cartItem.user = await this.userService.findOne(userId)
      cartItem.product = await this.productService.findOne(productId);
      return await this.cartRepository.save(cartItem);
    }
  
    async getCartItems(userId: number): Promise<Cart[]> {
      return await this.cartRepository.find({
        where: { user: { id: userId } },
      });
    }

    async removeAllItemsForUser(userId: number): Promise<void> {
      await this.cartRepository.delete({ user: { id: userId } });
    }
    

    async removeFromCart(cartItemId: number): Promise<void> {
      const cartItem = await this.cartRepository.findOne({where:{id:cartItemId}})
      if (!cartItem){
        throw new NotFoundException(`CartItem with ID ${cartItemId} not found in the user's cart`);
      }
      await this.cartRepository.delete({ id: cartItemId });
    }
  }