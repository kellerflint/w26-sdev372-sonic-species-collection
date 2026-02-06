import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";
import Species from "./species.schema.js";
import Trait from "./trait.schema.js";

const SpeciesTrait = sequelize.define(
  "species_trait",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    speciesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    traitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "species_traits",
  }
);

Species.belongsToMany(Trait, { through: SpeciesTrait, as: "traits" });
Trait.belongsToMany(Species, { through: SpeciesTrait, as: "species" });

export default SpeciesTrait;
