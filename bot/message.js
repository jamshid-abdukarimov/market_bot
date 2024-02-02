import start, { requestContact } from "./helpers/start.js";
import { bot } from "../index.js";
import User from "../models/User.js";
import getUsers from "./helpers/users.js";
import getCategories, { createCategory } from "./helpers/category.js";

export default function () {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      return start(msg);
    }

    const user = await User.findOne({ chatId });
    if (user) {
      if (user.action === "request_contact" && !user.phone) {
        return requestContact(user, msg);
      }
      if (text === "Foydalanuvchilar") {
        return getUsers(msg);
      }
      if (text === "Barcha kataloglar") {
        return getCategories(msg);
      }
      if (user.action === "add_category") {
        return createCategory(msg);
      }
    }
  });
}
