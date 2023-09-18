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
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('cart-items')
export class CartController {
  constructor(
    private readonly cartItemService: CartService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK) 
  async getCartItems(@Req() req) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    return this.cartItemService.getCartItems(userId);
  }

  @UseGuards(AuthGuard)
  @Post('add/:product_id')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Req() req, @Param('product_id') productId: number) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    return this.cartItemService.addToCart(userId, productId);
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
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    await this.cartItemService.removeAllItemsForUser(userId);
  }
}
