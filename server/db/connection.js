import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false
});

try {
    await sequelize.authenticate();
    console.log("Connected to MYSQL DB!")
} catch (err) {
    console.log("Can't connect to DB!");
    console.log(err);
}

export default sequelize