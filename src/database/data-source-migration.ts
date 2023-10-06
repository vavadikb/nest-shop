import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';


export const dataSourseOptions:DataSourceOptions =  {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Product, User, Cart, Order], 
      migrations: [],
      synchronize: false,
}

const dataSource = new DataSource(dataSourseOptions)
export default dataSource