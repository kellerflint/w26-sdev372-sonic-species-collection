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

export const createTrait = async (data) => {
    return await Trait.create(data)
}

export const updateTrait = async (id, data) => {
    const trait = await Trait.findByPk(id)
    if(!trait) return null
    await trait.update(data)
    return trait
}

export const deleteTrait = async (id) => {
    const trait = await Trait.findByPk(id)
    if(!trait) return null
    await trait.destroy()
    return true
}