"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWorkers = void 0;
const worker_model_1 = require("./worker.model");
const getAllWorkers = async (_req, res) => {
    try {
        const workers = await worker_model_1.Worker.find({});
        res.status(200).json(workers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch workers" });
    }
};
exports.getAllWorkers = getAllWorkers;
//# sourceMappingURL=worker.controller.js.map