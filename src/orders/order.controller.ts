import { Controller, Post, Get, Param, Body, Put, Delete,Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { AuthGuard } from 'src/auth/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly jwtService: JwtService,) {}

  @Post('/create')
  async createOrder(@Req() req): Promise<void> {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        return    await this.orderService.createOrder(parseInt(userId, 10));
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type autorization');
  }
  

  @Get('/user')
  async getUserOrders(@Req() req): Promise<Order[]> {
    const [type, token] = (req.headers.authorization || '').split(' ');

    if (type === 'Bearer') {
      try {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.id;
        return  await this.orderService.getUserOrders(userId)
      } catch (error) {
        throw new Error('Bad token');
      }
    }

    throw new Error('Error type autorization');
  }

  @Put('/update-order')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Param('status') status: string,
  ): Promise<void> {
    await this.orderService.updateOrderStatus(parseInt(orderId, 10), status);
  }

  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: string): Promise<void> {
    await this.orderService.deleteOrder(parseInt(orderId, 10));
  }
}
