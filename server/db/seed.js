import speciesData from "../models/species.js";
import Species from "../models/species.schema.js";
import Trait from "../models/trait.schema.js";
import SpeciesTrait from "../models/speciesTrait.schema.js";

const traits = [
  "No Ears",
  "Small Ears",
  "Tall Ears",
  "Round Ears",
  "Sharp Ears",
  "Thin Ears",
  "Wide Ears",
  "Darker Inner Ear",
  "Quills",
  "Fur",
  "Feathers",
  "Short Muzzle",
  "Long Muzzle",
  "Muzzle Fur",
  "Beak",
  "Skin-Colored Muzzle",
  "White Muzzle",
  "Long Nose",
  "Short Nose",
  "Round Nose",
  "Sharp Nose",
  "No Tail",
  "Short Tail",
  "Long Tail",
  "Thin Tail",
  "Fluffy Tail",
  "Round Tail",
];

const speciesTraits = {
  hedgehog: [
    "Small Ears",
    "Sharp Ears",
    "Quills",
    "Short Muzzle",
    "Skin-Colored Muzzle",
    "Long Nose",
    "Short Nose",
    "Round Nose",
    "Short Tail",
    "Thin Tail",
  ],
  fox: [
    "Tall Ears",
    "Sharp Ears",
    "Wide Ears",
    "Darker Inner Ear",
    "Fur",
    "Long Muzzle",
    "Muzzle Fur",
    "White Muzzle",
    "Short Nose",
    "Round Nose",
    "Long Tail",
    "Fluffy Tail",
  ],
  echidna: [
    "No Ears",
    "Quills",
    "Long Muzzle",
    "Skin-Colored Muzzle",
    "Long Nose",
    "Sharp Nose",
    "Long Tail",
    "Thin Tail",
  ],
  cat: [
    "Sharp Ears",
    "Fur",
    "Short Muzzle",
    "Muzzle Fur",
    "White Muzzle",
    "Short Nose",
    "Round Nose",
    "Long Tail",
    "Thin Tail",
    "Fluffy Tail",
  ],
  bird: ["No Ears", "Feathers", "Beak", "Long Tail"],
  rabbit: [
    "Tall Ears",
    "Round Ears",
    "Wide Ears",
    "Fur",
    "Short Muzzle",
    "Skin-Colored Muzzle",
    "Short Nose",
    "Round Nose",
    "Short Tail",
    "Fluffy Tail",
    "Round Tail",
  ],
  wolf: [
    "Sharp Ears",
    "Fur",
    "Long Muzzle",
    "Skin-Colored Muzzle",
    "Long Nose",
    "Short Nose",
    "Round Nose",
    "Long Tail",
    "Fluffy Tail",
  ],
};

const speciesRecords = [];
for (const specie of speciesData) {
  const [record] = await Species.findOrCreate({
    where: { name: specie.name },
    defaults: specie,
  });
  speciesRecords.push(record);
}

const traitRecords = [];
for (const name of traits) {
  const [record] = await Trait.findOrCreate({
    where: { name },
    defaults: { name },
  });
  traitRecords.push(record);
}

const speciesByName = new Map(
  speciesRecords.map((record) => [record.name.toLowerCase(), record])
);
const traitsByName = new Map(
  traitRecords.map((record) => [record.name.toLowerCase(), record])
);

let joinCount = 0;
for (const [speciesName, traitNames] of Object.entries(speciesTraits)) {
  const species = speciesByName.get(speciesName.toLowerCase());
  if (!species) {
    continue;
  }

  for (const traitName of traitNames) {
    const trait = traitsByName.get(traitName.toLowerCase());
    if (!trait) {
      continue;
    }

    await SpeciesTrait.findOrCreate({
      where: { speciesId: species.id, traitId: trait.id },
      defaults: { speciesId: species.id, traitId: trait.id },
    });
    joinCount += 1;
  }
}

console.log(
  `Seeded ${speciesRecords.length} species, ${traitRecords.length} traits, ${joinCount} species traits`
);
