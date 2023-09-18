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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/local-auth.guard';

@Controller('cart-items')
export class CartController {
  constructor(
    private readonly cartItemService: CartService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK) 
  async getCartItems(@Req() req) {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        return this.cartItemService.getCartItems(userId);
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type authorization');
  }

  @UseGuards(AuthGuard)
  @Post('add/:product_id')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Req() req, @Param('product_id') productId: number) {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        return this.cartItemService.addToCart(userId, productId);
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type authorization');
  }

  @UseGuards(AuthGuard)
  @Delete('/remove/:cartItemId')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeFromCart(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ): Promise<void> {
    await this.cartItemService.removeFromCart(cartItemId);
  }

  @UseGuards(AuthGuard)
  @Delete('/remove-all')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeAllItemsForUser(@Req() req): Promise<void> {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        await this.cartItemService.removeAllItemsForUser(userId);
      } catch (error) {
        throw new Error('Bad token');
      }
    }
  }
}
