"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_model_1 = require("./worker.model");
const router = express_1.default.Router();
// GET all workers
router.get("/", async (_req, res) => {
    try {
        const workers = await worker_model_1.Worker.find({});
        res.status(200).json(workers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch workers" });
    }
});
// GET single worker
router.get("/:id", async (req, res) => {
    try {
        const worker = await worker_model_1.Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ error: "Worker not found" });
        }
        return res.status(200).json(worker);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch worker" });
    }
});
// POST - Create new worker
router.post("/", async (req, res) => {
    try {
        const worker = new worker_model_1.Worker(req.body);
        await worker.save();
        res.status(201).json(worker);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create worker" });
    }
});
exports.default = router;
//# sourceMappingURL=worker.routes.js.map