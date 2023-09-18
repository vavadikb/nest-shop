import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Req() req): Promise<void> {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    await this.orderService.createOrder(userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserOrders(@Req() req): Promise<Order[]> {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization)
    return await this.orderService.getUserOrders(userId);
  }

  @Put('/update-order/:orderId/:status')
  @HttpCode(HttpStatus.OK)
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Param('status') status: string,
  ): Promise<void> {
    await this.orderService.updateOrderStatus(parseInt(orderId, 10), status);
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('orderId') orderId: string): Promise<void> {
    await this.orderService.deleteOrder(parseInt(orderId, 10));
  }
}
