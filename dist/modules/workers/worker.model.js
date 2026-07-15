"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const WorkerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    trade: { type: String, required: true },
    bio: { type: String, required: true },
    fullDescription: { type: String, required: true },
    rate: { type: Number, required: true },
    rateType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    skills: { type: [String], required: true },
    availability: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    userId: { type: String, required: true },
}, { timestamps: true });
exports.Worker = mongoose_1.default.model("Worker", WorkerSchema);
//# sourceMappingURL=worker.model.js.map