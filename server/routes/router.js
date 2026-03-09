import { Router } from "express";
import Species from "../models/species.schema.js";
import Trait from "../models/trait.schema.js";

const router = Router();

router.get("/api/all", async (req, res) => {
    try {
        const species = await Species.findAll();
        res.json(species);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species." });
    }
});

router.get("/api/name", async (req, res) => {
    try {
        const { name } = req.query;
        const data = await Species.findAll({ where: { name } });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species by name." });
    }
});

router.get("/api/species/:id/traits", async (req, res) => {
    try {
        const { id } = req.params;
        const species = await Species.findByPk(id, {
            include: [{ model: Trait, as: "traits", through: { attributes: [] } }],
        });
        if (!species) return res.status(404).json({ error: "Species not found" });
        res.json({ id: species.id, name: species.name, traits: species.traits ?? [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve traits for species." });
    }
});

router.get("/api/traits", async (req, res) => {
    try {
        const traits = await Trait.findAll();
        res.json(traits);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve traits." });
    }
});

router.get("/api/traits/:id/species", async (req, res) => {
    try {
        const { id } = req.params;
        const trait = await Trait.findByPk(id, {
            include: [{ model: Species, as: "species", through: { attributes: [] } }],
        });
        if (!trait) return res.status(404).json({ error: "Trait not found" });
        res.json({ id: trait.id, name: trait.name, species: trait.species ?? [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve species for trait." });
    }
});

export default router;
