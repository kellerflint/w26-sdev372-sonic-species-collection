import express from "express";
import cors from "cors";
import sequelize from "./db/connection.js";
import router from "./routes/router.js";
import "./models/species.schema.js";
import "./models/trait.schema.js";
import "./models/speciesTrait.schema.js";

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use('/', router);

app.get('/health', (_req, res) => res.sendStatus(200));

const PORT = process.env.API_PORT || 3001;

async function connectWithRetry(retries = 5, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log('Connected to DB!');
            return;
        } catch (err) {
            console.log(`DB not ready, retrying in ${delay}ms... (${i + 1}/${retries})`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Could not connect to DB after multiple retries');
}

await connectWithRetry();

await sequelize.sync();
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
