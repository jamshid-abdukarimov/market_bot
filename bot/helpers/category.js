import { bot } from "../../index.js";
import User from "../../models/User.js";
import Category from "../../models/Category.js";
import { categoryInlineKeyboards, userKeyBoards } from "../config/keyboards.js";

export async function getCategories(chatId, page = 1) {
  const LIMIT = 2;
  const [user, categories, categoriesCount] = await Promise.all([
    User.findOne({ chatId }, { admin: 1 }).lean(),
    Category.find()
      .limit(LIMIT)
      .skip((page - 1) * LIMIT)
      .lean(),
    Category.countDocuments(),
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

  bot.sendMessage(
    chatId,
    `Kategoriyalar: ${categoriesCount}ta \nSahifalar soni: ${Math.ceil(
      categoriesCount / LIMIT
    )}ta`,
    {
      reply_markup: {
        remove_keyboard: true,
        inline_keyboard: categoryInlineKeyboards(groupedData, user.admin, page),
      },
    }
  );
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
  return getCategories(chatId);
};

export const paginationCategory = async (chatId, data) => {
  const LIMIT = 2;
  let [user, categoriesCount] = await Promise.all([
    User.findOne({ chatId }),
    Category.countDocuments(),
  ]);
  const pages = Math.ceil(categoriesCount / LIMIT);
  let page = user.action.includes("category-") ? +user.action.split("-")[1] : 1;

  if (data === "next_category") {
    if (!(page < pages)) {
      return;
    }
    page++;
  }
  if (data === "back_category") {
    if (page > 1) {
      page--;
    } else {
      return;
    }
  }

  user.action = `category-${page}`;
  await user.save();
  return getCategories(chatId, page);
};

export const showCategory = async (chatId, id) => {};
