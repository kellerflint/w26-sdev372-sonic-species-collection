import Trait from "../models/trait.schema.js";
import Species from "../models/species.schema.js"

export const getAllTraits = async () => {
    return await Trait.findAll()
}

export const getSpeciesByTrait = async (id) => {
    return await Trait.findByPk(id, {
        include: [{ model: Species, as: "species", through: {attributes: [] } }]
    })
}