import express, {
  Errback,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import mongoose from "mongoose";
import "./config/passport";

// Routers
import authRouter from "./routes/auth";
import notesRouter from "./routes/notes";
import projectsRouter from "./routes/projects";

const app: Express = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port: string = process.env.PORT || "5000";

// Get environment variables
dotenv.config();

// Connect database
const mongoDb: string = process.env.MONGO_URI || "";
const connectDb = async (): Promise<void> => {
  await mongoose.connect(mongoDb);
  console.log("connected to mongodb successfully");
};

try {
  connectDb();
} catch (err) {
  console.log(err);
}

// Add cors
app.use(cors());

// Basic setup
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello si walid");
});

app.use("/auth", authRouter);
app.use("/notes", notesRouter);
app.use("/projects", projectsRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
  return;
});

app.listen(port, (): void => {
  console.log("Server running on port " + port);
});
