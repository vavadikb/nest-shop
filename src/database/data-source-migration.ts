import 'reflect-metadata';
import { Product } from 'src/entities/product.entity';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from 'src/entities/cart.entity';

// import { Country } from '../country/country.entity';
// import { Exchange } from '../exchange/exchange.entity';
// import { ExchangeOffice } from '../exchange-office/exchange-office.entity';
// import { Rate } from '../rate/rate.entity';
// import { Country1693137721487 } from './migrations/1693137721487-Country';
// import { RestModels1693139817207 } from './migrations/1693139817207-RestModels';

// import { Product } from 'src/entities/product.entity';



// https://github.com/typeorm/typeorm/issues/8810
// const DataSourceConfig = new DataSource({
//     type: 'postgres',
//     host: 'my_postgres', // Имя контейнера PostgreSQL или имя сети Docker
//     port: 5432,
//     username: 'myuser',
//     password: 'mypassword',
//     database: 'mydatabase',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'], // Пути к вашим сущностям
//     schema: 'public',
//     // synchronize: false,
//     migrations: ["src/migrations/**/*.ts"],
//     migrationsTableName: "Product",
//   });

// export default DataSourceConfig;


export const dataSourseOptions:DataSourceOptions =  {
      type: 'postgres',
      host: 'my_postgres',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [Product, User, Cart], 
      migrations: [__dirname +'/migrations/*.ts'],
      synchronize: true,
}

const dataSource = new DataSource(dataSourseOptions)
export default dataSource