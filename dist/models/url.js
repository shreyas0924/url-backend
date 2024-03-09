"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number,
            },
        },
    ],
}, {
    timestamps: true,
});
const URL = (0, mongoose_1.model)("URL", urlSchema);
exports.default = URL;
