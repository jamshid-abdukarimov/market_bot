import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import TelegramBot from "node-telegram-bot-api";
import connectDB from "./config/db.js";
import startBot from "./bot/index.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

connectDB();
export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
startBot();

app.listen(PORT, () => {
  console.log(`Server run at PORT ${PORT}`);
});
