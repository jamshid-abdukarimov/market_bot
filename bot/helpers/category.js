import { bot } from "../../index.js";
import User from "../../models/User.js";
import Category from "../../models/Category.js";
import { categoryInlineKeyboards, userKeyBoards } from "../config/keyboards.js";

export default async function getCategories(msg) {
  const chatId = msg.chat.id;
  const [user, categories] = await Promise.all([
    User.findOne({ chatId }, { admin: 1 }).lean(),
    Category.find(),
  ]);

  const groupedData = categories.reduce((acc, obj, index) => {
    if (index % 2 === 0) {
      acc.push([{ text: obj.title, callback_data: `category_${obj._id}` }]);
    } else {
      acc[acc.length - 1].push({
        text: obj.title,
        callback_data: `category_${obj._id}`,
      });
    }
    return acc;
  }, []);

  bot.sendMessage(chatId, `Kategoriyalar: ${categories.length}`, {
    reply_markup: {
      remove_keyboard: true,
      inline_keyboard: categoryInlineKeyboards(groupedData, user.admin),
    },
  });
}

export const addCategory = async (chatId) => {
  const user = await User.findOne({ chatId });
  if (user.admin) {
    user.action = "add_category";
    await user.save();
    return bot.sendMessage(chatId, "Yangi kategoriyani kiriting");
  } else {
    return bot.sendMessage(chatId, "Sizda bunday imkoniyat mavjud emas", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
};

export const createCategory = async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const doc = new Category({
    title: text,
    status: true,
  });
  await doc.save();
  bot.sendMessage(chatId, "Kategoriya qo'shildi");
  return getCategories(msg);
};
