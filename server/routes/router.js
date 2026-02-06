import { Router } from "express";
import schema from "../models/species.schema.js"

const router = Router();

// Test route 
router.get("/api/test", async (req, res) => {
    console.log("working");
    res.json({ message: "API working" });

});

router.get("/api/all", async (req, res) => {
    const species = await schema.findAll();
    res.json(species);
    console.log("Species returned");
})

router.get("/api/name", async (req, res) => {
    const { name } = req.query;

    const data = await schema.findAll({
        where: { name }
    });

    res.json(data);
})


export default router;