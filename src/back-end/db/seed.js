import species from "../../models/species.js";
import schema from "../../models/species.schema.js";

for(const specie of species) {
    await schema.create(specie);
}

console.log(`Inserted ${species.length} records`);