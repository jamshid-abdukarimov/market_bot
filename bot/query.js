import { bot } from "../index.js";
import { addCategory } from "./helpers/category.js";

export default function () {
  bot.on("callback_query", async (query) => {
    const chatId = query.from.id;
    const data = query.data;

    if (data === "add_category") {
      return addCategory(chatId);
    }
  });
}
