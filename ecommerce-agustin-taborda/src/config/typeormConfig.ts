import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig} from "dotenv";
import { registerAs } from "@nestjs/config";
import { User } from "src/users/entities/users.entity";
import { Product } from "src/products/entity/product.entity";
import { Category } from "src/categories/category.entity";
import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { Order } from "src/orders/order.entity";

dotenvConfig({path: './.env.development'});

const config = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
    // entities: [User, Product, Category, OrderDetails, Order],
}

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);

