import { bot } from "../../index.js";
import User from "../../models/User.js";
import {
  adminKeyBoards,
  contactKeyboard,
  userKeyBoards,
} from "../config/keyboards.js";

export default async function (msg) {
  const chatId = msg.chat.id;
  let checkUser = await User.findOne({ chatId });
  if (!checkUser) {
    const doc = new User({
      name: msg.from.first_name + " " + msg.from.last_name,
      chatId,
      createdAt: new Date(),
      action: "request_contact",
      admin: false,
    });
    await doc.save();
    bot.sendMessage(
      chatId,
      `Assalomu alaykum ${msg.from.first_name}. Iltimos telefon raqamingizni ulashing.`,
      {
        reply_markup: {
          keyboard: contactKeyboard,
          resize_keyboard: true,
        },
      }
    );
  } else {
    checkUser.action = "menu";
    await checkUser.save();
    bot.sendMessage(chatId, "Menuni tanlang", {
      reply_markup: {
        keyboard: checkUser.admin ? adminKeyBoards : userKeyBoards,
        resize_keyboard: true,
      },
    });
  }
}

export const requestContact = async (user, msg) => {
  const chatId = msg.chat.id;
  const phone = msg.contact.phone_number;

  user.phone = phone;
  user.action = "menu";
  await user.save();
  bot.sendMessage(chatId, "Menuni tanlang", {
    reply_markup: {
      keyboard: user.admin ? adminKeyBoards : userKeyBoards,
      resize_keyboard: true,
    },
  });
};
