import { Schema, model } from "mongoose";

const Category = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default model("Category", Category);
