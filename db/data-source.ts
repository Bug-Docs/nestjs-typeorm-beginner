import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"],
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;