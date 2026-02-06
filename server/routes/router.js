import { Router } from "express";
import Species from "../models/species.schema.js";
import Trait from "../models/trait.schema.js";

const router = Router();

// Test route 
router.get("/api/test", async (req, res) => {
    console.log("working");
    res.json({ message: "API working" });

});

router.get("/api/all", async (req, res) => {
    const species = await Species.findAll();
    res.json(species);
    console.log("Species returned");
})

router.get("/api/name", async (req, res) => {
    const { name } = req.query;

    const data = await Species.findAll({
        where: { name }
    });

    res.json(data);
})

router.get("/api/species/:id/traits", async (req, res) => {
    const { id } = req.params;

    const species = await Species.findByPk(id, {
        include: [{ model: Trait, as: "traits", through: { attributes: [] } }],
    });

    if (!species) {
        return res.status(404).json({ error: "Species not found" });
    }

    res.json({
        id: species.id,
        name: species.name,
        traits: species.traits ?? [],
    });
});


export default router;
