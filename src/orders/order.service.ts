import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
// import { Order } from 'src/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order | undefined> {
    return this.orderRepository.findOneOrFail({ where: { id } });
  }
  
  
  // async create(createOrderDto: CreateOrderDto): Promise<Order> {
  //   const order = new Order();
  //   order.user = createOrderDto.userId; 
  //   order.product = createOrderDto.productId
  
  //   return this.orderRepository.save(order);
  // }
  
  
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | undefined> {
    const partialOrder: Partial<Order> = {};
  
    await this.orderRepository.update(id, partialOrder);
  
    return this.orderRepository.findOneOrFail({ where: { id } });
  }
  

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
