import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Test = sequelize.define("Test", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default Test