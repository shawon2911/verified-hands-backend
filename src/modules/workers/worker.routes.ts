import express from "express";
import { Worker } from "./worker.model";

const router = express.Router();

// GET all workers
router.get("/", async (_req, res) => {
  try {
    const workers = await Worker.find({});
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// GET single worker
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    return res.status(200).json(worker);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch worker" });
  }
});

// POST - Create new worker
router.post("/", async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({ error: "Failed to create worker" });
  }
});

export default router;