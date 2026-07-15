"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_model_1 = require("./job.model");
const router = express_1.default.Router();
// POST - Create new job
router.post("/", async (req, res) => {
    try {
        const job = new job_model_1.Job(req.body);
        await job.save();
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create job" });
    }
});
// GET - All jobs (for workers to see)
router.get("/", async (_req, res) => {
    try {
        const jobs = await job_model_1.Job.find({ status: "open" }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});
// GET - Employer's own jobs
router.get("/employer/:employerId", async (req, res) => {
    try {
        const jobs = await job_model_1.Job.find({ employerId: req.params.employerId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});
// GET - Single job by ID
router.get("/:id", async (req, res) => {
    try {
        const job = await job_model_1.Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        return res.status(200).json(job);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch job" });
    }
});
exports.default = router;
//# sourceMappingURL=job.routes.js.map