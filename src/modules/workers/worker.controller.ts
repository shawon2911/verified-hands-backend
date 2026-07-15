import { Request, Response } from "express";
import { Worker } from "./worker.model";

export const getAllWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await Worker.find({});
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
};