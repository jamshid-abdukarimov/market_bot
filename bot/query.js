import { bot } from "../index.js";
import {
  addCategory,
  paginationCategory,
  showCategory,
} from "./helpers/category.js";

export default function () {
  bot.on("callback_query", async (query) => {
    const chatId = query.from.id;
    const data = query.data;

    if (data === "add_category") {
      return addCategory(chatId);
    }
    if (data.includes("category")) {
      paginationCategory(chatId, data);
    }
    if (data.includes("category_")) {
      const id = data.split("_")[1];
      showCategory(chatId, id);
    }
  });
}
