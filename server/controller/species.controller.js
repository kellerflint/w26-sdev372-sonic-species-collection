import Species from "../models/species.schema.js"
import Trait from "../models/trait.schema.js"

export const getAllSpecies = async () => {
    return await Species.findAll();
}

export const getSpeciesByName = async (name) => {
    return await Species.findAll({ where: { name } })
}

export const getTraitForSpecies = async (id) => {
    return await Species.findByPk(id, {
        include: [{ model: Trait, as: "traits", through: { attributes: [] } }]
    })
}

export const createSpecies = async (data) => {
    return await Species.create(data)
}

export const updateSpecies = async (id, data) => {
    const species = await Species.findByPk(id)
    if (!species) return null
    await species.update(data)
    return species
}

export const deleteSpecies = async (id) => {
    const species = await Species.findByPk(id)
    if (!species) return null
    await species.destroy()
    return true
}

export const linkTraitToSpecies = async (speciesId, traitId) => {
    const species = await Species.findByPk(speciesId);
    if (!species) return null;
    const trait = await Trait.findByPk(traitId);
    if (!trait) return null;
    await species.addTrait(trait);
    return true;
}