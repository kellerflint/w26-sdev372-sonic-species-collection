import express from "express";
import cors from "cors";
import sequelize from "./db/connection.js";
import Test from "./models/testModel.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Test route 
app.get("/api/test", async (req, res) => {
    res.json({ message: "API working" });
});

const PORT = 3001;

app.listen(PORT, async () => {
    console.log(`API running on port ${PORT}`)
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to MYSQL DB!")
})
