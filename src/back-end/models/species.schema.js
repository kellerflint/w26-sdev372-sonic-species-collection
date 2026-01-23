import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const schema = sequelize.define("species", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

await schema.sync({alter: true});

export default schema;