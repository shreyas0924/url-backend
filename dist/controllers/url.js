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
const shortid_1 = __importDefault(require("shortid"));
function handleNewShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const shortID = (0, shortid_1.default)();
        try {
            const newUrl = yield url_1.default.create({
                shortId: shortID,
                redirectURL: body.url,
                visitHistory: [],
            });
            return res.status(201).json(newUrl.shortId);
        }
        catch (error) {
            console.error("Error generating short URL:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.handleNewShortUrl = handleNewShortUrl;
