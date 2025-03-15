import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:3001", // Domain that can access server
        methods: ["POST", "GET", "PUT", "DELETE"], // Set Methods that allowed
        allowedHeaders: ["Content-Type", "Authorization"], // headers that allowed
        credentials: true, // Set access for cookie and headers
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);
app.use("/api", authRouter);

app.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);
});
