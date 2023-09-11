import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Req,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/local-auth.guard';

@Controller('cart-items')
export class CartController {
  constructor(
    private readonly cartItemService: CartService,
    private readonly jwtService: JwtService, // Добавляем jwtService в конструктор
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getCartItems(@Req() req) {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        console.log('user id: ', userId, 'product id', decodedToken);
        return this.cartItemService.getCartItems(userId);
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type autorization');
  }

  @UseGuards(AuthGuard)
  @Post('add/:product_id')
  async addToCart(@Req() req, @Param('product_id') productId: number) {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        console.log(userId, productId);
        return this.cartItemService.addToCart(userId, productId);
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type autorization');
  }

  @UseGuards(AuthGuard)
  @Delete('/remove/:cartItemId')
  async removeFromCart(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ): Promise<void> {
    await this.cartItemService.removeFromCart(cartItemId);
  }

}
