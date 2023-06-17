"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Routers
const events_1 = __importDefault(require("./routes/events"));
const folders_1 = __importDefault(require("./routes/folders"));
const notes_1 = __importDefault(require("./routes/notes"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
// () Imports
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// () Setting up variables
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// () Routes
app.get("/", (req, res) => {
    res.json('Home page');
});
app.use("/api/folders", folders_1.default);
app.use("/api/events", events_1.default);
app.use("/api/notes", notes_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
// () Export app
exports.default = app;
