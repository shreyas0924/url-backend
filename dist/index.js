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
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const url_1 = require("./routes/url");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const url_2 = __importDefault(require("./models/url"));
const PORT = 3000;
const app = (0, express_1.default)();
const uri = process.env.MONGO_URL;
if (!uri) {
    console.error("MongoDB URI is not provided.");
    process.exit(1);
}
mongoose_1.default
    .connect(uri, {
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/url", url_1.urlRouter);
app.get("/:shortUrl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrl = req.params.shortUrl;
    const entry = yield url_2.default.findOneAndUpdate({
        shortId: shortUrl,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    if (!entry) {
        // If no matching entry is found, send a 404 Not Found response
        return res.status(404).send("URL not found");
    }
    res.redirect(entry.redirectURL);
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
