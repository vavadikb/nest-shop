import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('cart-items')
@UseGuards(AuthGuard)
export class CartController {
  constructor(
    private readonly cartItemService: CartService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK) 
  async getCartItems(@Req() req) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    return this.cartItemService.getCartItems(userId);
  }

  @Post('add/:productId')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Req() req, @Param('product_id') productId: number) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    return this.cartItemService.addToCart(userId, productId);
  }

  @Delete('/remove/:cartItemId')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeFromCart(
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ): Promise<void> {
    await this.cartItemService.removeFromCart(cartItemId);
  }

  @Delete('/remove-all')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async removeAllItemsForUser(@Req() req): Promise<void> {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    await this.cartItemService.removeAllItemsForUser(userId);
  }
}
