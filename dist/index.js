"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_1 = require("better-auth/node");
const better_auth_1 = require("./config/better-auth");
const dns_1 = __importDefault(require("dns"));
const worker_routes_1 = __importDefault(require("./modules/workers/worker.routes"));
const job_routes_1 = __importDefault(require("./modules/jobs/job.routes"));
dns_1.default.setDefaultResultOrder("ipv4first");
dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth", (0, node_1.toNodeHandler)(better_auth_1.auth));
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
app.use("/api/workers", worker_routes_1.default);
app.use("/api/jobs", job_routes_1.default);
app.get("/", (_req, res) => {
    res.send("VerifiedHands API is running");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map