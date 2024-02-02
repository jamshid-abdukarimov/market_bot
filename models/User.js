import { Schema, model } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  chatId: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  action: String,
  createdAt: Date,
  status: {
    type: Boolean,
    default: true,
  },
});

export default model("User", User);
