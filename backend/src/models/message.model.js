import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const message = mongoose.model("message", messageSchema);
export default message;
