"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = __importDefault(require("express"));
const url_1 = require("../controllers/url");
const router = express_1.default.Router();
exports.urlRouter = router.post("/", url_1.handleNewShortUrl);
