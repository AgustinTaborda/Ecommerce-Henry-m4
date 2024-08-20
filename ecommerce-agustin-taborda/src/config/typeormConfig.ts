import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig} from "dotenv";
import { registerAs } from "@nestjs/config";

dotenvConfig({path: './.env.development'});

const config = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
}

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);

