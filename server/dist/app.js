"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
require("./config/passport");
// Routers
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const projects_1 = __importDefault(require("./routes/projects"));
const app = (0, express_1.default)();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || "5000";
// Get environment variables
dotenv_1.default.config();
// Connect database
const mongoDb = process.env.MONGO_URI || "";
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoDb);
    console.log("connected to mongodb successfully");
});
try {
    connectDb();
}
catch (err) {
    console.log(err);
}
// Add cors
app.use(cors());
// Basic setup
app.use(logger("dev"));
app.use((0, helmet_1.default)());
app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Routes
app.get("/", (req, res) => {
    res.send("Hello si walid");
});
app.use("/auth", auth_1.default);
app.use("/notes", notes_1.default);
app.use("/projects", projects_1.default);
// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log("Server running on port " + port);
});
