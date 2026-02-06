import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Trait = sequelize.define("trait", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Trait;
