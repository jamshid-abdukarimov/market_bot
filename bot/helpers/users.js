import { bot } from "../../index.js";
import User from "../../models/User.js";
import { userKeyBoards } from "../config/keyboards.js";

export default async function getUsers(msg) {
  const chatId = msg.chat.id;
  const user = await User.findOne({ chatId }).lean();
  if (user && user.admin) {
    const users = await User.find();
    return bot.sendMessage(
      chatId,
      `Foydalanuvchilar: ${users.length}
${users.map((user) => `${user.name}: ${user.chatId}\n`)}   
`
    );
  } else {
    return bot.sendMessage(
      chatId,
      `Sizda foydalanuvchilarni ko'rish imkoniyati mavjud emas`,
      {
        reply_markup: {
          keyboard: userKeyBoards,
          resize_keyboard: true,
        },
      }
    );
  }
}
