// import connectDB from "../config/database";
import express from "express";
import ServerRouter from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const server = express();

// Express configuration
server.set("port", process.env.PORT || 5000);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

// Connection to DB
// connectDB();

// Router
const router = new ServerRouter(server);
router.init();

const PORT = server.get("port");
server.listen(PORT, () => console.log(`Server Working on http://localhost:${PORT}`));
