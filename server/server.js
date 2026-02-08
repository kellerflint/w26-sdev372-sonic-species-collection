import express from "express";
import cors from "cors";
import sequelize from "./db/connection.js";
import router from "./routes/router.js";
import "./models/species.schema.js";
import "./models/trait.schema.js";
import "./models/speciesTrait.schema.js";


const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use('/', router);



const PORT = process.env.API_PORT || 3001;

app.listen(PORT, async () => {
    console.log(`API running on port ${PORT}`)
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to MYSQL DB!")
})
