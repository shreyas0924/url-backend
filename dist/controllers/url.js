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
exports.handleNewShortUrl = void 0;
const url_1 = __importDefault(require("../models/url"));
const uuid_1 = require("uuid");
function generateShortUUID() {
    // Generate a standard UUID
    const uuid = (0, uuid_1.v4)();
    // Take the first 8 characters
    const shortUUID = uuid.slice(0, 8);
    return shortUUID;
}
// Usage
const shortUUID = generateShortUUID();
function handleNewShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const shortId = shortUUID;
        try {
            const newUrl = yield url_1.default.create({
                shortId,
                redirectURL: body.url,
                visitHistory: [],
            });
            const shortenedId = newUrl.shortId;
            console.log(`Short ID : ${shortenedId}`);
            return res.status(201).json(shortenedId);
        }
        catch (error) {
            console.error("Error generating short URL:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.handleNewShortUrl = handleNewShortUrl;
