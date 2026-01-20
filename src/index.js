import express from "express";
import cors from "cors";
import sequelize from "./db/connection.js";
import schema from "./models/species.schema.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route 
app.get("/api/test", async (req, res) => {
    console.log("working");
    res.json({ message: "API working" });

});

app.get("/api/all", async (req, res) => {
    const species = await schema.findAll();
    res.json(species);
    console.log("Species returned");
})

app.get("/api/name", async (req, res) => {
    const name = req.query.name

    const data = await schema.findAll({
        where: { name }
    });

    res.json(data);
})

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, async () => {
    console.log(`API running on port ${PORT}`)
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to MYSQL DB!")
})
