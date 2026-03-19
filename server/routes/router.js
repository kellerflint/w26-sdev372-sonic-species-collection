import { Router } from "express";
// import Species from "../models/species.schema.js";
// import Trait from "../models/trait.schema.js";
import { getAllSpecies, getSpeciesByName, getTraitForSpecies, createSpecies, updateSpecies, deleteSpecies, linkTraitToSpecies } from "../controller/species.controller.js";
import { getAllTraits, getSpeciesByTrait, createTrait, updateTrait, deleteTrait } from "../controller/trait.controller.js";

const router = Router();

// Species routes
router.get("/api/all", async (req, res) => {
    try {
        const species = await getAllSpecies();
        res.json(species);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species." });
    }
});

router.get("/api/name", async (req, res) => {
    try {
        const { name } = req.query;
        const data = await getSpeciesByName(name);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species by name." });
    }
});

router.get("/api/species/:id/traits", async (req, res) => {
    try {
        const { id } = req.params;
        const species = await getTraitForSpecies(id)

        if (!species) return res.status(404).json({ error: "Species not found" });
        res.json({ id: species.id, name: species.name, traits: species.traits ?? [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve traits for species." });
    }
});

router.post("/api/species/collect", async (req, res) => {
    const { addName } = req.body;
    const data = {
        name: addName
    }
    try {
        const species = await createSpecies(data)
        res.json({ message: "Species added!", content: species })
    } catch {
        res.status(500).json({ error: "Failed to add species" })
    }
})

router.delete("/api/species/:id/gone", async (req, res) => {
    const id = req.params.id
    try {
        const species = await deleteSpecies(id)
        if (!species) return res.status(404).json({ error: "Species not found" })
        res.json({ success: true })
    } catch {
        res.status(500).json({ error: "Failed to delete species" })
    }
})

router.put("/api/species/:id", async (req, res) => {
    const { id } = req.params;
    const updated = await updateSpecies(id, req.body);
    if (!updated) return res.status(404).json({ error: "Species not found" });
    res.json(updated);
});

router.post("/api/species/:speciesId/traits/:traitId", async (req, res) => {
    const { speciesId, traitId } = req.params;
    try {
        const result = await linkTraitToSpecies(speciesId, traitId);
        if (!result) return res.status(404).json({ error: "Species or trait not found" });
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Failed to link trait to species" });
    }
});

// Trait routes

router.get("/api/traits", async (req, res) => {
    try {
        const traits = await getAllTraits();
        res.json(traits);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve traits." });
    }
});

router.get("/api/traits/:id/species", async (req, res) => {
    try {
        const { id } = req.params;
        const trait = await getSpeciesByTrait(id)
        if (!trait) return res.status(404).json({ error: "Trait not found" });
        res.json({ id: trait.id, name: trait.name, species: trait.species ?? [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species for trait." });
    }
});

router.post("/api/traits/collect", async (req, res) => {
    const { addName } = req.body
    const data = {
        name: addName
    }
    try {
        const trait = await createTrait(data)
        res.status(200).json({ message: "Trait added!", content: trait })
    } catch {
        res.status(500).json({ error: "Couldn't add Trait" })
    }
})

router.delete("/api/traits/:id/gone", async (req, res) => {
    const id = req.params.id
    try {
        const trait = await deleteTrait(id)
        if (!trait) return res.status(404).json({ error: "Trait not found" })
        res.json({ success: true })
    } catch {
        res.status(500).json({ error: "Failed to delete trait" })
    }
})

router.put("/api/traits/:id", async (req, res) => {
    const { id } = req.params;
    const updated = await updateTrait(id, req.body);
    if (!updated) return res.status(404).json({ error: "Trait not found" });
    res.json(updated);
});

export default router;
